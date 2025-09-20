package com.example.schedulerservice.model.dto.request;

public record CreateRequestLog(
        String email,
        int fromYear,
        int fromMonth,
        int fromDay,
        int fromHour,
        int fromMinute,
        int fromSecond,
        int toYear,
        int toMonth,
        int toDay,
        int toHour,
        int toMinute,
        int toSecond
) {
}
