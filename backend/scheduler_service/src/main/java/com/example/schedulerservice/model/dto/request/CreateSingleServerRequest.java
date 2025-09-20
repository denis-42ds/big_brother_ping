package com.example.schedulerservice.model.dto.request;


import com.example.schedulerservice.model.entity.Server;
import lombok.Builder;

import java.util.List;


public record CreateSingleServerRequest(List<Server> items) {
    @Builder
    public CreateSingleServerRequest {
    }
}