package com.example.schedulerservice.model.dto;


import com.example.schedulerservice.model.dto.response.ServerStatusResponse;
import com.example.schedulerservice.model.entity.ServerStatusLog;
import lombok.Builder;

import java.util.List;

public record ServerStatusDtoList(List<ServerStatusResponse> serverStatusResponses,
                                  List<ServerStatusLog> serverAlertList) {
    @Builder
    public ServerStatusDtoList {
    }
}
