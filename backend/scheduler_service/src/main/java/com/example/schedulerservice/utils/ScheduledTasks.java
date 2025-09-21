package com.example.schedulerservice.utils;


import com.example.schedulerservice.config.UpdateConsumer;
import com.example.schedulerservice.exeption.UnableSendMessageToClientException;
import com.example.schedulerservice.model.dto.ServerStatusDtoList;
import com.example.schedulerservice.service.ServerStatusChecker;
import com.example.schedulerservice.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Component
@Getter
@RequiredArgsConstructor
public class ScheduledTasks {

    private final TaskScheduler taskScheduler;
    private final ServerStatusChecker serverStatusChecker;
    private final SimpMessagingTemplate messagingTemplate;

    private ScheduledFuture<?> scheduledTask;

    private final UpdateConsumer updateConsumer;

    @Value("${scheduledTasks.enabledSchedule}")
    private volatile boolean enabledSchedule;

    @Value("${scheduledTasks.enabledScheduleNotification}")
    private volatile boolean enabledScheduleNotification;

    @Value("${scheduledTasks.timeout}")
    private volatile int timeout;

    private final AtomicInteger fixedRate = new AtomicInteger(60); // начальное значение



    @PostConstruct
    public void init() {
        scheduleTask();
    }

    public synchronized void setEnabledScheduleNotificationOn() {
        this.enabledScheduleNotification = true;

    }
    public synchronized void setEnabledScheduleNotificationOff() {
        this.enabledScheduleNotification = false;

    }


    public synchronized void setTimeout(int nanoOfSecond) {
        this.timeout = nanoOfSecond;
        cancelTask();
        scheduleTask();
    }

    public synchronized void setFixedRate(int seconds) {
        this.fixedRate.set(seconds);
        cancelTask();
        scheduleTask();
    }

    public synchronized void setEnabledScheduleOn() {
        this.enabledSchedule = true;
        scheduleTask();
    }

    public synchronized void setEnabledScheduleOF() {
        this.enabledSchedule = false;
        cancelTask();
    }

    private void scheduleTask() {
        if (enabledSchedule) {
            this.scheduledTask = taskScheduler.scheduleAtFixedRate(() -> {
                try {
                    ServerStatusDtoList result = serverStatusChecker.allServersStatus(timeout);

                    messagingTemplate.convertAndSend("/status-of-servers/server-status-updates", result.serverStatusResponses());// отправляем событие клиенту

//                 Если включено то посылаем сообщения в телеграмм
                    if (enabledScheduleNotification && !result.serverAlertList().isEmpty()){
                        updateConsumer.sendMessage(result.serverAlertList(),fixedRate,timeout);
                   }
                } catch (RuntimeException e) {

                    log.error(e.getMessage(), e);
                    throw new UnableSendMessageToClientException(HttpStatus.FORBIDDEN,e.getMessage());
                }
            }, Duration.ofSeconds(fixedRate.get()));
        }
    }

    private void cancelTask() {
        if (scheduledTask != null && !scheduledTask.isCancelled()) {
            scheduledTask.cancel(true);
        }
    }

}
