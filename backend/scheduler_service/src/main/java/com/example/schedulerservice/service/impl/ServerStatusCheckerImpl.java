package com.example.schedulerservice.service.impl;


import com.example.schedulerservice.exeption.ErrorWhilePingingException;
import com.example.schedulerservice.exeption.FailedToResolveHostException;
import com.example.schedulerservice.exeption.StorageDataNotFoundException;
import com.example.schedulerservice.mapper.ServerStatusMapper;
import com.example.schedulerservice.model.constant.ServerStatus;
import com.example.schedulerservice.model.dto.ServerStatusDtoList;
import com.example.schedulerservice.model.dto.response.ServerStatusResponse;
import com.example.schedulerservice.model.entity.Server;
import com.example.schedulerservice.model.entity.ServerStatusLog;
import com.example.schedulerservice.repository.ServerRepository;
import com.example.schedulerservice.repository.ServerRepositoryLog;
import com.example.schedulerservice.service.ServerStatusChecker;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import static com.example.schedulerservice.utils.ServerAvailabilityChecker.getResponseCodeAndLatency;

@Slf4j
@Service
@Getter
@Setter
@RequiredArgsConstructor
public class ServerStatusCheckerImpl implements ServerStatusChecker {

    private final ServerStatusMapper serverStatusMapper;
    private final ServerRepository serverRepository;
    private final ServerRepositoryLog serverRepositoryLog;

    public ServerStatusDtoList serverStatusDtoList;

    @Value("${list.size.split}")
    public int size = 10;

    private static final String PATH = "https://";

    public synchronized ServerStatusDtoList getServerStatusDtoList() {
        return serverStatusDtoList;
    }
    @Override
    @Transactional
    public ServerStatusDtoList getStatusForSingleServer(List<Server> serverIdList, int timeout){

        List<Server> singleServers = new ArrayList<>();

        for (Server server : serverIdList) {
            singleServers.add(serverRepository
                    .findById(server.getServerId()).orElseThrow(
                            () -> new StorageDataNotFoundException("No server in DB with this id: " + server.getServerId())));
        }

        List<ServerStatusResponse> serverStatusResponses = parallelProcess(List.of(singleServers), timeout);

        return new ServerStatusDtoList(serverStatusResponses);
    }

    @Override
//    @CachePut(value = "server", key = "'allServersStatus'")
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public ServerStatusDtoList allServersStatus(int timeout) {

        List<Server> allServers = serverRepository.findAll();

        if (allServers.isEmpty()) {
            throw new StorageDataNotFoundException("No one Server in database");
        }

        // Деление списка на группы
        // Обрабатываем каждую группу отдельно
        List<ServerStatusResponse> serverStatusResponses = parallelProcess(splitIntoGroups(allServers, size), timeout);

        //Сохраняем данные для логов.
        List<ServerStatusLog> serverStatusLogs = serverStatusMapper.serverStatusResponseListToServerStatusLogList(serverStatusResponses);

        for (ServerStatusLog serverStatusLog : serverStatusLogs) {
            serverStatusLog.setServerId(null);
            serverStatusLog.setLocalDateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(3)).toLocalDateTime());

        }
        serverRepositoryLog.saveAll(serverStatusLogs);

        return new ServerStatusDtoList(serverStatusResponses);
    }

    @Override
    public ServerStatusResponse serverHealthCheck(Server server, int timeout) {

        try {
            InetAddress inet = InetAddress.getByName(server.getServerUrl());
            if (inet.isReachable(timeout)) { // Установите таймаут в миллисекундах
                log.info(server.getServerUrl() + " online");

                String url = PATH + server.getServerUrl();

                Map<String, String> responseCodeAndLatency = getResponseCodeAndLatency(url);

                ServerStatusResponse serverStatusResponse = serverStatusMapper.serverToServerStatusResponse(server);

                serverStatusResponse.setServerStatus(ServerStatus.ONLINE);
                serverStatusResponse.setResponseCode(responseCodeAndLatency.get("code"));
                serverStatusResponse.setLatency(responseCodeAndLatency.get("latency"));

                return serverStatusResponse;
            }
        } catch (UnknownHostException e) {

            throw new FailedToResolveHostException("Failed to resolve host " + server.getServerUrl());
        } catch (IOException e) {

            throw new ErrorWhilePingingException("Error while pinging " + server.getServerUrl() + ": " + e.getMessage());
        }
        log.info(server.getServerUrl() + " OFFLINE !!!!");

        ServerStatusResponse serverStatusResponse = serverStatusMapper.serverToServerStatusResponse(server);

        serverStatusResponse.setServerStatus(ServerStatus.OFFLINE);

        return serverStatusResponse;
    }

    private List<List<Server>> splitIntoGroups(List<Server> list, int size) {
        List<List<Server>> result = new ArrayList<>();
        for (int i = 0; i < list.size(); i += size) {
            result.add(list.subList(i, Math.min(i + size, list.size())));
        }
        return result;
    }


    private List<ServerStatusResponse> parallelProcess(List<List<Server>> groups, int timeout) {
        ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
        try {
            List<CompletableFuture<ServerStatusResponse>> futures = new ArrayList<>();
            for (List<Server> group : groups) {
                futures.addAll(group.stream()
                        .map(server -> CompletableFuture.supplyAsync(() -> serverHealthCheck(server, timeout), executor))
                        .toList());
            }
            return futures.stream()
                    .map(CompletableFuture::join)
                    .collect(Collectors.toList());
        } finally {
            executor.shutdown();
        }
    }

}
