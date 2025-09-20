package com.example.schedulerservice.mapper;


import com.example.schedulerservice.model.dto.response.ServerStatusForReport;
import com.example.schedulerservice.model.entity.ServerStatusLog;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ServerStatusLogMapper {

    ServerStatusForReport serverStatusLogToServerStatusForReport(ServerStatusLog serverStatusLog);

    List<ServerStatusForReport> serverStatusLogListToServerStatusForReportList(List<ServerStatusLog> serverStatusLogs);


    default Page<ServerStatusForReport> pageServerLogsToPageServerStatusForReport(Page<ServerStatusLog> dataServerLogs) {
        return dataServerLogs.map(this::serverStatusLogToServerStatusForReport);
    }


}
