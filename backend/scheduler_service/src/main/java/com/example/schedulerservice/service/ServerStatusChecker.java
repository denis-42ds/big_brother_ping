package com.example.schedulerservice.service;


import com.example.schedulerservice.model.dto.ServerStatusDtoList;
import com.example.schedulerservice.model.dto.response.ServerStatusResponse;
import com.example.schedulerservice.model.entity.Server;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface ServerStatusChecker {

    ServerStatusDtoList getStatusForSingleServer(List<Server> serverIdList, int timeout);

    ServerStatusDtoList allServersStatus(int timeout);

    ServerStatusResponse serverHealthCheck(Server server, int timeout);
}
