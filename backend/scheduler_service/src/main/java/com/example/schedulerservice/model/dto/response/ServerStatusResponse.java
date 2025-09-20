package com.example.schedulerservice.model.dto.response;


import com.example.schedulerservice.model.constant.ServerStatus;
import lombok.*;

import java.util.UUID;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ServerStatusResponse {

    UUID serverId;

    String serverUrl;

    String serverName;

    String responseCode;

    String latency;

    private volatile ServerStatus serverStatus;

    public synchronized void setServerStatus(ServerStatus serverStatus){
        this.serverStatus = serverStatus;
    }

}
