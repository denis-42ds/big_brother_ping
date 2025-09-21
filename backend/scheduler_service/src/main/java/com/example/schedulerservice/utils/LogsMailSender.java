package com.example.schedulerservice.utils;

import com.example.schedulerservice.service.ServerLogService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.File;
@Slf4j
@Component
@RequiredArgsConstructor
public class LogsMailSender {

    private final JavaMailSender mailSender;
    private final ServerLogService serverLogService;

    @Value("${spring.mail.username}")
    private String userName;

    private static final String FILE_PATH = "SeverStatusReport.csv";

    public void sendCsvReport(String recipientEmail) {

        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(userName);
            helper.setTo(recipientEmail);
            helper.setSubject("CSV Report Attachment");
            helper.setText("Please find the attached CSV file.");

            File csvFile = new File(FILE_PATH);

            if (csvFile.exists()) {
                FileSystemResource resource = new FileSystemResource(csvFile);
                helper.addAttachment("report.csv", resource);
            } else {
                log.info("The CSV file was not found at path {}", csvFile.getAbsolutePath());
            }

            mailSender.send(message);
            log.info("Email sent successfully with attachment to {}", recipientEmail);
        } catch (Exception e) {
            log.error("Error sending email: ", e);
        }
    }

}
