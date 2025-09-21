package com.example.schedulerservice.utils;


import com.example.schedulerservice.config.UpdateConsumer;
import com.example.schedulerservice.exeption.UnableSendMessageToClientException;
import com.example.schedulerservice.model.dto.ServerStatusDtoList;
import com.example.schedulerservice.model.entity.Server;
import com.example.schedulerservice.service.ServerStatusChecker;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
@Getter
@RequiredArgsConstructor
public class ScheduledSingleTasks {

    private final TaskScheduler taskScheduler;
    private final ServerStatusChecker serverStatusChecker;
    private final SimpMessagingTemplate messagingTemplate;

    private ScheduledFuture<?> scheduledSingleTask;

    private final UpdateConsumer updateConsumer;

    @Value("${scheduledTasks.enabledSchedule}")
    private volatile boolean enabledSingleSchedule;

    @Value("${scheduledTasks.enabledScheduleNotification}")
    private volatile boolean enabledSingleScheduleNotification;

    @Value("${scheduledTasks.timeout}")
    private volatile int singleTaskTimeout;

    private final AtomicInteger singleFixedRate = new AtomicInteger(60); // начальное значение

    private volatile List<Server> serverIdList;

    @PostConstruct
    public void init() {
        scheduleSingleTask();
    }

    public synchronized void setSingleScheduleNotificationOn() {
        this.enabledSingleScheduleNotification = true;

    }
    public synchronized void setSingleScheduleNotificationOff() {
        this.enabledSingleScheduleNotification = false;

    }

    public synchronized void setServerId(List<Server> serverIdList) {
        this.serverIdList = serverIdList;
        cancelSingleTask();
        scheduleSingleTask();
    }

    public synchronized void setSingleTaskTimeout(int nanoOfSecond) {
        this.singleTaskTimeout = nanoOfSecond;
        cancelSingleTask();
        scheduleSingleTask();
    }

    public synchronized void setSingleFixedRate(int seconds) {
        this.singleFixedRate.set(seconds);
        cancelSingleTask();
        scheduleSingleTask();
    }

    public synchronized void setSingleScheduleOn() {
        this.enabledSingleSchedule = true;
        scheduleSingleTask();
    }

    public synchronized void setSingleScheduleOF() {
        this.enabledSingleSchedule = false;
        cancelSingleTask();
    }

    private void scheduleSingleTask() {
        if (enabledSingleSchedule) {
            this.scheduledSingleTask = taskScheduler.scheduleAtFixedRate(() -> {
                try {
                    ServerStatusDtoList result = serverStatusChecker.getStatusForSingleServer(serverIdList, singleTaskTimeout);
                    messagingTemplate.convertAndSend("/status-of-servers/single-server-status-updates", result); // отправляем событие клиенту

                    if (enabledSingleScheduleNotification && !result.serverAlertList().isEmpty()){
                        updateConsumer.sendMessage(result.serverAlertList(),singleFixedRate,singleTaskTimeout);
                    }
                } catch (RuntimeException e) {

                    log.error(e.getMessage(), e);
                    throw new UnableSendMessageToClientException(HttpStatus.FORBIDDEN, e.getMessage());
                }
            }, Duration.ofSeconds(singleFixedRate.get()));
        }
    }

    private void cancelSingleTask() {
        if (scheduledSingleTask != null && !scheduledSingleTask.isCancelled()) {
            scheduledSingleTask.cancel(true);
        }
    }

}
