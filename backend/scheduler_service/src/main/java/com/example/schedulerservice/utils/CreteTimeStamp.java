package com.example.schedulerservice.utils;



import com.example.schedulerservice.model.dto.request.CreateRequestLog;

import java.time.LocalDateTime;

public class CreteTimeStamp {

    public static LocalDateTime fromTimeStamp(CreateRequestLog requestLog) {

        return LocalDateTime.of(requestLog.fromYear(),
                requestLog.fromMonth(),
                requestLog.fromDay(),
                requestLog.fromHour(),
                requestLog.fromMinute(),
                requestLog.fromSecond());
    }

    public static LocalDateTime toTimeStamp(CreateRequestLog requestLog) {

        return LocalDateTime.of(requestLog.toYear(),
                requestLog.toMonth(),
                requestLog.toDay(),
                requestLog.toHour(),
                requestLog.toMinute(),
                requestLog.toSecond());
    }
}
