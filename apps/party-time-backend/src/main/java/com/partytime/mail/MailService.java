package com.partytime.mail;

import com.partytime.configuration.PartyTimeConfigurationProperties;
import com.partytime.jpa.entity.Account;
import com.partytime.jpa.entity.Event;
import com.partytime.jpa.mapper.AddressMapper;
import com.partytime.mail.model.ics.IcsEventData;
import com.samskivert.mustache.Mustache;
import com.samskivert.mustache.Template;
import jakarta.mail.BodyPart;
import jakarta.mail.Message;
import jakarta.mail.Multipart;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.mustache.MustacheResourceTemplateLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    public static final String TEMPLATE_VERIFY_ACCOUNT = "verify_account";
    public static final String TEMPLATE_INVITATION = "invitation";
    public static final String TEMPLATE_CHANGE = "change-event";
    public static final String TEMPLATE_DELETE = "delete-event";
    public static final String TEMPLATE_UNINVITE = "uninvite";


    private final JavaMailSender javaMailSender;
    private final MustacheResourceTemplateLoader loader;
    private final Mustache.Compiler mustacheCompiler;
    private final PartyTimeConfigurationProperties configurationProperties;

    @SneakyThrows
    public void sendMail(String to, String subject, String template, Object data) {
        sendMail(to, subject, template, data, null);
    }

    @SneakyThrows
    public void sendMail(String to, String subject, String template, Object data, Event icalAttachment) {
        Reader reader = loader.getTemplate(template);
        Template compile = mustacheCompiler.compile(reader);
        String content = compile
            .execute(data);
        sendMail(to, subject, content, icalAttachment);
    }

    @SneakyThrows
    private void sendMail(String to, String subject, String text, Event icalAttachment) {
        if (configurationProperties.getMail().isEnabled()) {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            mimeMessage.setContent(text, "text/html; charset=utf-8");

            mimeMessage.setFrom("noreply@partytime.com");
            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mimeMessage.setSubject(subject);

            if (icalAttachment == null) {
                mimeMessage.setText(text);
                javaMailSender.send(mimeMessage);
            } else {
                BodyPart messageBodyPart = new MimeBodyPart();
                messageBodyPart.setText(text);

                MimeBodyPart attachment = new MimeBodyPart();

                File file = Files.createTempFile("ical", "ics").toFile();
                FileOutputStream out = new FileOutputStream(file);
                IcsEventData build = buildIcsEventDataFromEvent(icalAttachment);
                Reader reader = loader.getTemplate("event-ics");
                String icsText = mustacheCompiler.compile(reader)
                    .execute(build);
                StreamUtils.copy(icsText, StandardCharsets.UTF_8, out);
                out.flush();
                out.close();

                attachment.attachFile(file);

                Multipart multipart = new MimeMultipart();
                multipart.addBodyPart(messageBodyPart);
                multipart.addBodyPart(attachment);

                mimeMessage.setContent(multipart);

                javaMailSender.send(mimeMessage);
            }
        } else {
            log.info("Would send a Mail now ;)");
            log.info("TO: " + to);
            log.info("SUBJECT: " + subject);
            if (icalAttachment != null) {
                IcsEventData build = buildIcsEventDataFromEvent(icalAttachment);
                Reader reader = loader.getTemplate("event-ics");
                String icsText = mustacheCompiler.compile(reader)
                    .execute(build);
                log.info("ICAL Attachment: " + icsText);
            }
            log.info("BODY: " + text);
        }
    }

    /**
     * Implements F019
     */
    private IcsEventData buildIcsEventDataFromEvent(Event icalAttachment) {
        Account organizer = icalAttachment.getOrganizer();
        return IcsEventData.builder()
            .website(configurationProperties.getUrl())
            .generatedTimestamp(formatTimestamp(LocalDateTime.now()))
            .organizerName(organizer.getName())
            .organizerEmail(organizer.getEmail())
            .uid(UUID.randomUUID().toString().replace("-", ""))
            .start(formatTimestamp(icalAttachment.getDateTime()))
            .event(icalAttachment.getName())
            .address(AddressMapper.prettyPrint(icalAttachment.getAddress()))
            .build();
    }

    private static String formatTimestamp(LocalDateTime ts) {
        return ts.getYear() + ts.getMonthValue() + ts.getDayOfMonth() + "T"
            + ts.getHour() + ts.getMinute() + ts.getSecond() + "Z";
    }

}
