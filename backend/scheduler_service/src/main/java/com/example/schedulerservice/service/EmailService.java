package com.example.schedulerservice.service;

import com.example.schedulerservice.model.dto.request.CreateRequestLog;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;

public interface EmailService {
    SimpleMessageResponse sendReportAllServers(String recipientEmail, CreateRequestLog createRequestLog, int page, int size);

    SimpleMessageResponse sendReportServersByName(String recipientEmail, String serverName, CreateRequestLog createRequestLog, int page, int size);

    SimpleMessageResponse sendReportServersByUrl(String recipientEmail, String serverUrl, CreateRequestLog createRequestLog, int page, int size);

    SimpleMessageResponse sendReportServerByServerStatus(String recipientEmail, String serverStatus, CreateRequestLog createRequestLog, int page, int size);
}
