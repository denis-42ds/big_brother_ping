package com.example.schedulerservice.service;

import com.example.schedulerservice.model.dto.ServerStatusForLogsDtoPage;
import com.example.schedulerservice.model.dto.request.CreateRequestLog;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;
import org.springframework.transaction.annotation.Transactional;

public interface ServerLogService {
    //  - по всем серверам за определённое время
    @Transactional
    ServerStatusForLogsDtoPage getServerLogs(CreateRequestLog createRequestLog,
                                             int page, int size);

    //- по одному серверу за определённое время имя
    @Transactional
    ServerStatusForLogsDtoPage getServerLogsByName(CreateRequestLog createRequestLog,
                                                   String serverName,
                                                   int page, int size);

    //- по одному серверу за определённое время URL
    @Transactional
    ServerStatusForLogsDtoPage getServerLogsByUrl(CreateRequestLog createRequestLog,
                                                  String serverUrl,
                                                  int page, int size);

    //- по статусу сервера за определённое время
    @Transactional
    ServerStatusForLogsDtoPage getServerLogsByServerStatus(CreateRequestLog createRequestLog,
                                                           String serverStatus,
                                                           int page, int size);

    SimpleMessageResponse deleteLogs(CreateRequestLog createRequestLog);
}
