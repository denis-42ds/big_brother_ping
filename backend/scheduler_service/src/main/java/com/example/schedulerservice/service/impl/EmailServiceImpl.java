package com.example.schedulerservice.service.impl;

import com.example.schedulerservice.model.dto.ServerStatusForLogsDtoPage;
import com.example.schedulerservice.model.dto.request.CreateRequestLog;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;
import com.example.schedulerservice.service.EmailService;
import com.example.schedulerservice.service.ServerLogService;
import com.example.schedulerservice.utils.CsvWriter;
import com.example.schedulerservice.utils.LogsMailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.example.schedulerservice.utils.CreteTimeStamp.fromTimeStamp;
import static com.example.schedulerservice.utils.CreteTimeStamp.toTimeStamp;


@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final LogsMailSender logsMailSender;
    private final ServerLogService serverLogService;

//    private static final String FILE_PATH = "./report/report.csv";
    private static final String FILE_PATH = "SeverStatusReport.csv";

    @Override
    public SimpleMessageResponse sendReportAllServers(String recipientEmail, CreateRequestLog createRequestLog, int page, int size) {

        ServerStatusForLogsDtoPage serverLogs = serverLogService.getServerLogs(createRequestLog, page, size);

        CsvWriter.writeToCsv(serverLogs, FILE_PATH, fromTimeStamp(createRequestLog), toTimeStamp(createRequestLog));

        logsMailSender.sendCsvReport(createRequestLog.email());

        return new SimpleMessageResponse("Logs report was sanded to " + recipientEmail);
    }

    @Override
    public SimpleMessageResponse sendReportServersByName(String recipientEmail, String serverName, CreateRequestLog createRequestLog, int page, int size) {

        ServerStatusForLogsDtoPage serverLogs = serverLogService.getServerLogsByName(createRequestLog, serverName, page, size);

        CsvWriter.writeToCsv(serverLogs, FILE_PATH, fromTimeStamp(createRequestLog), toTimeStamp(createRequestLog));

        logsMailSender.sendCsvReport(createRequestLog.email());


        return new SimpleMessageResponse("Logs report sorted by name was sanded to " + recipientEmail);
    }

    @Override
    public SimpleMessageResponse sendReportServersByUrl(String recipientEmail, String serverUrl, CreateRequestLog createRequestLog, int page, int size) {

        ServerStatusForLogsDtoPage serverLogs = serverLogService.getServerLogsByUrl(createRequestLog, serverUrl, page, size);

        CsvWriter.writeToCsv(serverLogs, FILE_PATH, fromTimeStamp(createRequestLog), toTimeStamp(createRequestLog));

        logsMailSender.sendCsvReport(createRequestLog.email());


        return new SimpleMessageResponse("Logs report sorted by Url was sanded to " + recipientEmail);
    }

    @Override
    public SimpleMessageResponse sendReportServerByServerStatus(String recipientEmail, String serverStatus, CreateRequestLog createRequestLog, int page, int size) {

        ServerStatusForLogsDtoPage serverLogs = serverLogService.getServerLogsByServerStatus(createRequestLog, serverStatus, page, size);

        CsvWriter.writeToCsv(serverLogs, FILE_PATH, fromTimeStamp(createRequestLog), toTimeStamp(createRequestLog));

        logsMailSender.sendCsvReport(createRequestLog.email());


        return new SimpleMessageResponse("Logs report sorted by server status was sanded to " + recipientEmail);
    }


}
