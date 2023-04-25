package com.partytime.mail;

import com.partytime.configuration.PartyTimeConfigurationProperties;
import com.samskivert.mustache.Mustache;
import com.samskivert.mustache.Template;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.mustache.MustacheResourceTemplateLoader;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.stereotype.Service;

import java.io.Reader;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    public static final String TEMPLATE_VERIFY_ACCOUNT = "verify_account";

    private final JavaMailSender javaMailSender;
    private final MustacheResourceTemplateLoader loader;
    private final Mustache.Compiler mustacheCompiler;
    private final PartyTimeConfigurationProperties configurationProperties;

    @SneakyThrows
    public void sendMail(String to, String subject, String template, Object data) {
        Reader reader = loader.getTemplate(template);
        Template compile = mustacheCompiler.compile(reader);
        String content = compile
            .execute(data);
        sendMail(to, subject, content);
    }

    private void sendMail(String to, String subject, String text) throws MessagingException {
        if (configurationProperties.getMail().isEnabled()) {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            mimeMessage.setContent(text, "text/html; charset=utf-8");

            mimeMessage.setFrom("noreply@partytime.com");
            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mimeMessage.setSubject(subject);
            mimeMessage.setText(text);
            javaMailSender.send(mimeMessage);
        } else {
            log.info("Would send a Mail now ;)");
            log.info("TO: " + to);
            log.info("SUBJECT: " + subject);
            log.info("BODY: " + text);
        }
    }

}
