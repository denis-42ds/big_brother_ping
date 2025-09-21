package com.example.schedulerservice.utils;

import com.example.schedulerservice.model.entity.ServerStatusLog;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class FormMessage {

    public static String createMessage(List<ServerStatusLog> serverAlertList, AtomicInteger fixedRate , int timeout){

        String mes = "";

        StringBuilder message = new StringBuilder(mes);

        for (ServerStatusLog serverStatusLog : serverAlertList) {
            message.append(String.format("Сервер %s url %s состояние %s превышено время отклика %s мс, периодичность проверки %s сек\n",
                    serverStatusLog.getServerName(),
                    serverStatusLog.getServerUrl(),
                    serverStatusLog.getServerStatus(),
                    timeout,
                    fixedRate));
        }

       return message.toString();
    }
}
