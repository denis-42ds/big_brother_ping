package com.example.schedulerservice.service.impl;


import com.example.schedulerservice.exeption.StorageDataNotFoundException;
import com.example.schedulerservice.mapper.ServerStatusLogMapper;
import com.example.schedulerservice.model.dto.ServerStatusForLogsDtoPage;
import com.example.schedulerservice.model.dto.request.CreateRequestLog;
import com.example.schedulerservice.model.dto.response.ServerStatusForReport;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;
import com.example.schedulerservice.model.entity.ServerStatusLog;
import com.example.schedulerservice.repository.ServerRepositoryLog;
import com.example.schedulerservice.service.ServerLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CachePut;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.example.schedulerservice.utils.CreteTimeStamp.fromTimeStamp;
import static com.example.schedulerservice.utils.CreteTimeStamp.toTimeStamp;


@Service
@RequiredArgsConstructor
public class ServerLogServiceImpl implements ServerLogService {

    private final ServerRepositoryLog serverRepositoryLog;
    private final ServerStatusLogMapper serverStatusLogMapper;

    //  - по всем серверам за определённое время
    @Override
    @Transactional
    public ServerStatusForLogsDtoPage getServerLogs(CreateRequestLog createRequestLog,
                                                    int page, int size) {
        Page<ServerStatusLog> dataServerLogs = serverRepositoryLog.getServerDataAll(
                fromTimeStamp(createRequestLog),
                toTimeStamp(createRequestLog),
                PageRequest.of(page, size));

        if (dataServerLogs.isEmpty())
            throw new StorageDataNotFoundException("No data logs since "
                    + fromTimeStamp(createRequestLog) + " to " + toTimeStamp(createRequestLog));

        return new ServerStatusForLogsDtoPage(serverStatusLogMapper.pageServerLogsToPageServerStatusForReport(dataServerLogs));
    }

    //- по одному серверу за определённое время имя
    @Override
    @Transactional
    public ServerStatusForLogsDtoPage getServerLogsByName(CreateRequestLog createRequestLog,
                                                          String serverName,
                                                          int page, int size) {

        Page<ServerStatusLog> dataServerLogs = serverRepositoryLog.getServerDataByName(
                fromTimeStamp(createRequestLog),
                toTimeStamp(createRequestLog),
                serverName,
                PageRequest.of(page, size));

        if (dataServerLogs.isEmpty())
            throw new StorageDataNotFoundException("No data logs for server name : " + serverName + "since "
                    + fromTimeStamp(createRequestLog) + " to " + toTimeStamp(createRequestLog));

        Page<ServerStatusForReport> serverStatusForReports = serverStatusLogMapper.pageServerLogsToPageServerStatusForReport(dataServerLogs);

        return new ServerStatusForLogsDtoPage(serverStatusForReports);
    }

    //- по одному серверу за определённое время URL
    @Override
    @Transactional
    public ServerStatusForLogsDtoPage getServerLogsByUrl(CreateRequestLog createRequestLog,
                                                         String serverUrl,
                                                         int page, int size) {

        Page<ServerStatusLog> dataServerLogs = serverRepositoryLog.getServerDataByUrl(
                fromTimeStamp(createRequestLog),
                toTimeStamp(createRequestLog),
                serverUrl,
                PageRequest.of(page, size));

        if (dataServerLogs.isEmpty())
            throw new StorageDataNotFoundException("No data logs for server Url: " + serverUrl + "since "
                    + fromTimeStamp(createRequestLog) + " to " + toTimeStamp(createRequestLog));


        return new ServerStatusForLogsDtoPage(serverStatusLogMapper.pageServerLogsToPageServerStatusForReport(dataServerLogs));
    }

    //- по статусу сервера за определённое время
    @Override
    @Transactional
    public ServerStatusForLogsDtoPage getServerLogsByServerStatus(CreateRequestLog createRequestLog,
                                                                  String serverStatus,
                                                                  int page, int size) {

        Page<ServerStatusLog> dataServerLogs = serverRepositoryLog.getServerDataByServerStatus(
                fromTimeStamp(createRequestLog),
                toTimeStamp(createRequestLog),
                serverStatus,
                PageRequest.of(page, size));

        if (dataServerLogs.isEmpty())
            throw new StorageDataNotFoundException("No data logs for server status: " + serverStatus + "since "
                    + fromTimeStamp(createRequestLog) + " to " + toTimeStamp(createRequestLog));

        return new ServerStatusForLogsDtoPage(serverStatusLogMapper.pageServerLogsToPageServerStatusForReport(dataServerLogs));

    }

    @Override
    public SimpleMessageResponse deleteLogs(CreateRequestLog createRequestLog) {

        serverRepositoryLog.deleteLogs(fromTimeStamp(createRequestLog), toTimeStamp(createRequestLog));

        return new SimpleMessageResponse(
                "All logs deleted from " + fromTimeStamp(createRequestLog) + " to " + toTimeStamp(createRequestLog));
    }
}
