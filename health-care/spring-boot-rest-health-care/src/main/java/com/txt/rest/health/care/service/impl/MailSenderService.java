package com.txt.rest.health.care.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.txt.rest.health.care.constant.Constants;
import freemarker.template.Configuration;
import freemarker.template.Template;
import jakarta.mail.BodyPart;
import jakarta.mail.Multipart;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailSenderService {

    private final Environment env;
    private final JavaMailSender mailSender;
    private final Configuration configuration;

    public void sendEmailByTemplate(String data) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            log.info("send email by : {}", data);
            Map<String, Object> event = mapper.readValue(data, HashMap.class);
            Map<String, Object> params = mapper.convertValue(event.get(Constants.MailConstant.EMAIL_PARAMS), HashMap.class);
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            String mailFrom = env.getProperty(Constants.MailConstant.EMAIL_FROM_RULE);
            List<String> mailTo = mapper.readValue(mapper.writeValueAsString(event.get(Constants.MailConstant.EMAIL_TO)), new TypeReference<>() {
            });
            List<String> mailCc = mapper.readValue(mapper.writeValueAsString(event.get(Constants.MailConstant.EMAIL_CC)), new TypeReference<>() {
            });
            Object subject = event.get(Constants.MailConstant.EMAIL_SUBJECT);
            Object templateName = event.get(Constants.MailConstant.TEMPLATE_NAME);
            String html = StringUtils.EMPTY;

            if (StringUtils.isNotBlank(mailFrom)) {
                helper.setFrom(mailFrom);
            }
            if (!CollectionUtils.isEmpty(mailTo)) {
                helper.setTo(mailTo.toArray(new String[0]));
            }
            if (!CollectionUtils.isEmpty(mailCc)) {
                helper.setCc(mailCc.toArray(new String[0]));
            }
            if (Objects.nonNull(subject)) {
                helper.setSubject(subject.toString());
            }
            if (Objects.nonNull(templateName)) {
                Template template = configuration.getTemplate(templateName + ".ftl");
                html = FreeMarkerTemplateUtils.processTemplateIntoString(template, params);
            }

            Multipart multipart = new MimeMultipart();
            BodyPart htmlBodyPart = new MimeBodyPart();
            htmlBodyPart.setContent(html, Constants.MailConstant.CONTENT_TYPE);
            multipart.addBodyPart(htmlBodyPart);
            message.setContent(multipart);
            mailSender.send(helper.getMimeMessage());
            log.info("sendEmailByTemplate success for {}", data);

        } catch (Exception ex) {
            log.error("sendEmailByTemplate failed:", ex.getMessage(), ex);
        }
    }
}
