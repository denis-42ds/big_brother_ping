package com.example.schedulerservice.utils;

import com.example.schedulerservice.model.constant.ServerStatus;
import com.example.schedulerservice.model.entity.ServerStatusLog;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ServerAlert {

    private List<ServerStatusLog> serversOfflinePast = new ArrayList<>();

    public List<ServerStatusLog> notificationSend(List<ServerStatusLog> serversOfflineNow) {

        List<ServerStatusLog> toSend;

        List<ServerStatusLog> result = new ArrayList<>();

        if (serversOfflineNow.isEmpty()){

            result = new ArrayList<>(serversOfflinePast); // копия offServer

            result.forEach(server -> server.setServerStatus(ServerStatus.ONLINE));

        }

        if (serversOfflineNow.size() > serversOfflinePast.size()) {
            toSend = new ArrayList<>(serversOfflineNow); // делаем копию, чтобы не изменять оригиналы
            toSend.removeAll(serversOfflinePast);

            result = toSend;
            log.info("Numbers of offline Servers up to");

        } else {
            toSend = new ArrayList<>(serversOfflinePast); // копия offServer
            toSend.removeAll(serversOfflineNow);

            toSend.forEach(server -> server.setServerStatus(ServerStatus.ONLINE));

            result = toSend;
        }

        // обновляем основную коллекцию offline servers
        serversOfflinePast = serversOfflineNow;

        return result;
    }
}
