package com.partytime.mail;

import com.samskivert.mustache.Mustache;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    public static final String TEMPLATE_VERIFY_ACCOUNT = "verify_account.mustache";

    private final JavaMailSender javaMailSender;
    private final Mustache.Compiler mustacheCompiler;

    public void sendMail(String to, String subject, String template, Object data) {
        String content = mustacheCompiler.compile(template)
            .execute(data);
        sendMail(to, subject, content);
    }

    private void sendMail(String to, String subject, String text) {
        SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setFrom("noreply@partytime.de");
        simpleMessage.setTo(to);
        simpleMessage.setSubject(subject);
        simpleMessage.setText(text);
        javaMailSender.send(simpleMessage);
    }

}
