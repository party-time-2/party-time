package com.partytime.mail

import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.jpa.mapper.toIcsEventData
import com.partytime.mail.model.IcsEventData
import com.partytime.mail.model.MailEvent
import com.partytime.mail.model.MustacheData
import com.samskivert.mustache.Mustache
import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.mail.BodyPart
import jakarta.mail.Message
import jakarta.mail.Multipart
import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeBodyPart
import jakarta.mail.internet.MimeMultipart
import org.springframework.boot.autoconfigure.mustache.MustacheResourceTemplateLoader
import org.springframework.context.ApplicationListener
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Component
import org.springframework.util.StreamUtils
import java.io.File
import java.io.FileOutputStream
import java.nio.charset.StandardCharsets
import java.nio.file.Files

private val mailLogger = KotlinLogging.logger {}

/**
 * Listener for [MailEvent] events.
 *
 * @param javaMailSender Sender for mails, configured by Spring with application configuration details
 * @param loader Loader for mustache mail templates
 * @param mustacheCompiler Compiler for inserting information into mustache mail templates
 * @param configurationProperties Used to check if actual mail sending is enabled (or just logging) and server url retrieval
 */
@Component
class MailEventListener(
    private val javaMailSender: JavaMailSender,
    private val loader: MustacheResourceTemplateLoader,
    private val mustacheCompiler: Mustache.Compiler,
    private val configurationProperties: PartyTimeConfigurationProperties
): ApplicationListener<MailEvent> {
    companion object {
        /** Mail template for e-mail verification */
        const val TEMPLATE_VERIFY_ACCOUNT: String = "verify_account"
        /** Mail template for event invitation */
        const val TEMPLATE_INVITATION: String = "invitation"
        /** Mail template for changed event details */
        const val TEMPLATE_CHANGE: String = "change-event"
        /** Mail template for event cancellation */
        const val TEMPLATE_DELETE: String = "delete-event"
        /** Mail template for event uninviting */
        const val TEMPLATE_UNINVITE: String = "uninvite"
    }

    /**
     * Handles [MailEvent] sent through the event system.
     *
     * @param event The [MailEvent] containing information about the e-mail to be sent
     */
    override fun onApplicationEvent(event: MailEvent) {
        val mustacheRenderResult = renderMustache(event.template, event.data)

        if (configurationProperties.mail.enabled) {
            val mimeMessage = javaMailSender.createMimeMessage().apply {
                setFrom("noreply@partytime.com")
                addRecipient(Message.RecipientType.TO, InternetAddress(event.recipientEmail))
                this.subject = event.subject
            }

            val messageBodyPart: BodyPart = MimeBodyPart()
            messageBodyPart.setText(mustacheRenderResult)

            var file: File? = null

            val attachmentBodyPart = event.icsEvent?.let { icsEvent ->
                Files.createTempFile("ical", "ics").toFile().let { realFile ->
                    file = realFile

                    FileOutputStream(realFile).use { out ->
                        val build: IcsEventData = icsEvent.toIcsEventData(configurationProperties.url)
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
            mailLogger.info { "TO: ${event.recipientEmail}" }
            mailLogger.info { "SUBJECT: ${event.subject}" }

            if (event.icsEvent != null) {
                val build: IcsEventData = event.icsEvent.toIcsEventData(configurationProperties.url)
                val reader = loader.getTemplate("event-ics")
                val icsText = mustacheCompiler.compile(reader)
                    .execute(build)
                mailLogger.info { "ICAL Attachment: $icsText" }
            }
            mailLogger.info { "BODY: $mustacheRenderResult" }
        }
    }

    private fun renderMustache(template: String, data: MustacheData): String {
        val reader = loader.getTemplate(template)
        val compile = mustacheCompiler.compile(reader)
        return compile.execute(data)
    }




}
