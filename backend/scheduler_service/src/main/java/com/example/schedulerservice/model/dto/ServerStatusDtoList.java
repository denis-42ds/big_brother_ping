package com.example.schedulerservice.model.dto;


import com.example.schedulerservice.model.dto.response.ServerStatusResponse;
import lombok.Builder;

import java.util.List;

public record ServerStatusDtoList(List<ServerStatusResponse> serverStatusResponses) {
    @Builder
    public ServerStatusDtoList {
    }
}
