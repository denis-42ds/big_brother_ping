package com.example.schedulerservice.model.dto.response;

import com.example.schedulerservice.model.constant.Role;
import lombok.Builder;

public record UserResponseDto(
        String firstName,

        String lastName,

        String mobilePhone,

        Role userRole,

        String userChatId
) {

    @Builder
    public UserResponseDto {
    }
}
