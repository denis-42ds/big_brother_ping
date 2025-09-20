package com.example.schedulerservice.service;



import com.example.schedulerservice.model.dto.ServerStatusDtoPage;
import com.example.schedulerservice.model.dto.CreateNewServerDtoList;
import com.example.schedulerservice.model.dto.request.CreateNewServerRequest;
import com.example.schedulerservice.model.dto.response.ServerStatusResponse;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;

import java.util.UUID;

public interface ServerService {

    SimpleMessageResponse addNewServersIntoDB(CreateNewServerDtoList serverDtoList);


    ServerStatusResponse findServerByServerUrl(String serverUrl, int timeout);


    ServerStatusResponse findServerByServerName(String serverName, int timeout);


    ServerStatusResponse updateServer(UUID serverId, CreateNewServerRequest updateServer);


    ServerStatusDtoPage findAllServers(int page, int size);


    SimpleMessageResponse deleteServer(UUID serverId);
}
