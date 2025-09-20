package com.example.schedulerservice.model.dto;


import com.example.schedulerservice.model.dto.request.CreateNewServerRequest;
import lombok.Builder;

import java.util.List;


public record CreateNewServerDtoList(List<CreateNewServerRequest> items) {
    @Builder
    public CreateNewServerDtoList {
    }
}