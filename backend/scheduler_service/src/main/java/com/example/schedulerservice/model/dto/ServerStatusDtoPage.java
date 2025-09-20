package com.example.schedulerservice.model.dto;


import com.example.schedulerservice.model.dto.response.ServerStatusResponse;
import lombok.Builder;
import org.springframework.data.domain.Page;

public record ServerStatusDtoPage(Page<ServerStatusResponse> items) {

    @Builder
    public ServerStatusDtoPage {
    }
}

