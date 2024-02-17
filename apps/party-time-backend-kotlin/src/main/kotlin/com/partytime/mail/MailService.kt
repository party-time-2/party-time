package com.partytime.mail

import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.jpa.entity.Account
import com.partytime.jpa.entity.Event
import com.partytime.jpa.mapper.prettyPrint
import com.partytime.mail.model.EventData
import com.partytime.mail.model.IcsEventData
import com.samskivert.mustache.Mustache
import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.mail.BodyPart
import jakarta.mail.Message
import jakarta.mail.Multipart
import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeBodyPart
import jakarta.mail.internet.MimeMultipart
import org.springframework.boot.autoconfigure.mustache.MustacheResourceTemplateLoader
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service
import org.springframework.util.StreamUtils
import java.io.File
import java.io.FileOutputStream
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.time.LocalDateTime
import java.util.UUID

private val mailLogger = KotlinLogging.logger {}

@Service
class MailService(
    private val javaMailSender: JavaMailSender,
    private val loader: MustacheResourceTemplateLoader,
    private val mustacheCompiler: Mustache.Compiler,
    private val configurationProperties: PartyTimeConfigurationProperties
) {
    companion object {
        const val TEMPLATE_VERIFY_ACCOUNT: String = "verify_account"
        const val TEMPLATE_INVITATION: String = "invitation"
        const val TEMPLATE_CHANGE: String = "change-event"
        const val TEMPLATE_DELETE: String = "delete-event"
        const val TEMPLATE_UNINVITE: String = "uninvite"
    }

    fun sendMail(to: String, subject: String, template: String, data: Any, icalAttachment: Event? = null) {
        val reader = loader.getTemplate(template)
        val compile = mustacheCompiler.compile(reader)
        val content = compile.execute(data)
        sendMail(to, subject, content, icalAttachment)
    }

    private fun sendMail(to: String, subject: String, text: String, icalAttachment: Event?) {
        if (configurationProperties.mail.enabled) {
            val mimeMessage = javaMailSender.createMimeMessage().apply {
                //setContent(text, "text/html; charset=utf-8")
                setFrom("noreply@partytime.com")
                addRecipient(Message.RecipientType.TO, InternetAddress(to))
                this.subject = subject
            }

            val messageBodyPart: BodyPart = MimeBodyPart()
            messageBodyPart.setText(text)

            var file: File? = null

            val attachmentBodyPart = icalAttachment?.let {
                Files.createTempFile("ical", "ics").toFile().let { realFile ->
                    file = realFile

                    FileOutputStream(realFile).use { out ->
                        val build: IcsEventData = buildIcsEventDataFromEvent(icalAttachment)
                        val reader = loader.getTemplate("event-ics")
                        val icsText = mustacheCompiler.compile(reader)
                            .execute(build)
                        StreamUtils.copy(icsText, StandardCharsets.UTF_8, out)
                        out.flush()
                    }

                    MimeBodyPart().also { attachment ->
                        attachment.attachFile(realFile)
                    }
                }
            }

            val multipart: Multipart = MimeMultipart().apply {
                addBodyPart(messageBodyPart)
                attachmentBodyPart?.let { addBodyPart(it) }
            }

            mimeMessage.setContent(multipart)

            javaMailSender.send(mimeMessage)
            file?.delete()
        } else {
            mailLogger.info { "Would send a Mail now ;)" }
            mailLogger.info { "TO: $to" }
            mailLogger.info { "SUBJECT: $subject" }

            if (icalAttachment != null) {
                val build: IcsEventData = buildIcsEventDataFromEvent(icalAttachment)
                val reader = loader.getTemplate("event-ics")
                val icsText = mustacheCompiler.compile(reader)
                    .execute(build)
                mailLogger.info { "ICAL Attachment: $icsText" }
            }
            mailLogger.info { "BODY: $text" }
        }
    }


    /**
     * Implements F019
     */
    private fun buildIcsEventDataFromEvent(event: Event): IcsEventData {
        val organizer: Account = event.organizer
        return IcsEventData(
            EventData(
                organizer.name,
                event.name,
                event.address.prettyPrint(),
                formatTimestamp(event.dateTime)
            ),
            configurationProperties.url,
            formatTimestamp(LocalDateTime.now()),
            organizer.email,
            UUID.randomUUID().toString().replace("-", "")
        )
    }

    private fun formatTimestamp(ts: LocalDateTime): String =
        "${ts.year}${ts.monthValue}${ts.dayOfMonth}T${ts.hour}${ts.minute}${ts.second}Z"
}
