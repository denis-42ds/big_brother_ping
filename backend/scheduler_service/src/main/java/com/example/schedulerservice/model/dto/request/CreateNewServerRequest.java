package com.example.schedulerservice.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

public record CreateNewServerRequest(
        String serverUrl,
        String serverName
) {
    @Builder
    public CreateNewServerRequest {
    }
}