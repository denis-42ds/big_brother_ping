package com.example.schedulerservice.model.dto.response;

import lombok.Builder;

public record UserMessageResponseDto(
        String userMessage
) {
    @Builder
    public UserMessageResponseDto {

    }
}
