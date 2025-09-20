package com.example.schedulerservice.model.dto;


import com.example.schedulerservice.model.dto.response.ServerStatusForReport;
import lombok.Builder;
import org.springframework.data.domain.Page;

import java.util.List;

public record ServerStatusForLogsDtoPage(Page<ServerStatusForReport> serverStatusForReports) {
    @Builder
    public ServerStatusForLogsDtoPage {
    }
}
