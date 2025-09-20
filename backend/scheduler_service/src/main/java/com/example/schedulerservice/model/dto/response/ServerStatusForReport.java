package com.example.schedulerservice.model.dto.response;


import com.example.schedulerservice.model.constant.ServerStatus;
import lombok.Builder;

import java.time.LocalDateTime;

public record ServerStatusForReport(

        String serverUrl,

        String serverName,

        LocalDateTime localDateTime,

        ServerStatus serverStatus,

        String responseCode,

        String latency

) {
    @Builder
    public ServerStatusForReport {

    }
}
