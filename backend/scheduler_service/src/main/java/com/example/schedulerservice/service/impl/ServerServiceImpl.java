package com.example.schedulerservice.service.impl;


import com.example.schedulerservice.exeption.NoServerExistException;
import com.example.schedulerservice.exeption.StorageDataNotFoundException;
import com.example.schedulerservice.mapper.ServerStatusMapper;
import com.example.schedulerservice.model.dto.ServerStatusDtoPage;
import com.example.schedulerservice.model.dto.CreateNewServerDtoList;
import com.example.schedulerservice.model.dto.request.CreateNewServerRequest;
import com.example.schedulerservice.model.dto.response.ServerStatusResponse;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;
import com.example.schedulerservice.model.entity.Server;
import com.example.schedulerservice.repository.ServerRepository;
import com.example.schedulerservice.service.ServerService;
import com.example.schedulerservice.service.ServerStatusChecker;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServerServiceImpl implements ServerService {

    private final ServerRepository serverRepository;
    private final ServerStatusMapper serverStatusMapper;
    private final ServerStatusChecker serverStatusChecker;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public SimpleMessageResponse addNewServersIntoDB(CreateNewServerDtoList serverDtoList) {

        List<Server> serversToDB;

        if (!serverDtoList.items().isEmpty()) {
            serversToDB = serverDtoList.items().stream()
                    .map(serverDto -> Server.builder()
                            .serverUrl(serverDto.serverUrl())
                            .serverName(serverDto.serverName())
                            .build())
                    .toList();


        } else {
            throw new NoServerExistException("No one servers in input list");
        }

        serverRepository.saveAll(serversToDB);

        return new SimpleMessageResponse("Servers added into database");
    }

    @Override
    @Transactional
    public ServerStatusResponse findServerByServerUrl(String serverUrl, int timeout) {

        Server server = serverRepository.findByServerUrl(serverUrl)
                .orElseThrow(() -> new StorageDataNotFoundException("No one server with this Url " + serverUrl));

        return serverStatusChecker.serverHealthCheck(server, timeout);
    }

    @Override
    @Transactional
    public ServerStatusResponse findServerByServerName(String serverName, int timeout) {

        Server server = serverRepository.findByServerName(serverName)
                .orElseThrow(() -> new StorageDataNotFoundException("No one server with this name " + serverName));

        return serverStatusChecker.serverHealthCheck(server, timeout);
    }

    @Override
    @Transactional
    public ServerStatusResponse updateServer(UUID serverId, CreateNewServerRequest updateServer) {

        Server serverFromBD = serverFindAndCheck(serverId);

        serverFromBD.setServerUrl(updateServer.serverUrl());
        serverFromBD.setServerName(updateServer.serverName());

        serverRepository.save(serverFromBD);

        return serverStatusMapper.serverToServerStatusResponse(serverFromBD);
    }

    @Override
    @Transactional
    @Cacheable("server")
    public ServerStatusDtoPage findAllServers(int page, int size) {

        Page<Server> serverPage = serverRepository.findAll(PageRequest.of(page, size));

        if (serverPage.isEmpty()) {
            throw new StorageDataNotFoundException("No one server in DB");
        }

        return new ServerStatusDtoPage(serverStatusMapper.pageServerToPageServerStatusResponseDto(serverPage));
    }
    @Override
    @Transactional
    public SimpleMessageResponse deleteServer(UUID serverId){

        Server server = serverFindAndCheck(serverId);

        serverRepository.delete(server);

        return new SimpleMessageResponse("Server deleted with Id: " + serverId.toString());
    }

    private Server serverFindAndCheck(UUID serverId){

        return serverRepository.findById(serverId)
                .orElseThrow(() -> new StorageDataNotFoundException("No one server with this Id: " + serverId));
    }


}
