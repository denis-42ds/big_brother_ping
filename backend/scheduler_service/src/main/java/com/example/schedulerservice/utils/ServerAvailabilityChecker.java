package com.example.schedulerservice.utils;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

public class ServerAvailabilityChecker {

    public static Map<String, String> getResponseCodeAndLatency(String serverUrl) {

        Map<String, String> result = new HashMap<>();

        long responseCode = 0;

        try {
            Instant startTime = Instant.now(); // Начало измерения времени

            // Создаем соединение
            URL url = new URL(serverUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            // Получаем код ответа
            responseCode = connection.getResponseCode();

            result.put("code",String.valueOf(responseCode));

            // Завершаем соединение
            connection.disconnect();

            // Замеряем время отклика
            Instant finishTime = Instant.now();
            Duration duration = Duration.between(startTime, finishTime);
            long millis = duration.toMillis();
            System.out.println("Время отклика: " + millis + " миллисекунд");

            result.put("latency",String.valueOf(millis));

        } catch (IOException e) {
            System.err.println("Ошибка подключения к серверу: " + e.getMessage());
        }

        return result;
    }



}


