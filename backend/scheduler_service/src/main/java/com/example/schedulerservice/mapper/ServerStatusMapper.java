package com.example.schedulerservice.mapper;


import com.example.schedulerservice.model.dto.response.ServerStatusResponse;
import com.example.schedulerservice.model.entity.Server;
import com.example.schedulerservice.model.entity.ServerStatusLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ServerStatusMapper {

    ServerStatusResponse serverToServerStatusResponse(Server server);

    default Page<ServerStatusResponse> pageServerToPageServerStatusResponseDto(Page<Server> page) {

        return page.map(this::serverToServerStatusResponse);
    }

    @Mapping(target = "localDateTime", source = "localDateTime")
    ServerStatusLog serverStatusResponseToServerStatusLog(ServerStatusResponse serverStatusResponse, LocalDateTime localDateTime);


    List<ServerStatusLog> serverStatusResponseListToServerStatusLogList (List<ServerStatusResponse> serverStatusResponses);
}
