package com.example.schedulerservice.model.dto;

import com.example.schedulerservice.model.dto.response.UserInfoResponseDto;
import lombok.Builder;

import java.util.List;

public record UserDtoList(List<UserInfoResponseDto> userItems) {
    @Builder
    public UserDtoList {
    }
}
