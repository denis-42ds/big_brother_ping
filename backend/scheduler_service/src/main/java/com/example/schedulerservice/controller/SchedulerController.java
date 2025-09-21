package com.example.schedulerservice.controller;


import com.example.schedulerservice.handler.ErrorResponse;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;
import com.example.schedulerservice.utils.ScheduledTasks;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/server-status/scheduler")
public class SchedulerController {

    private final ScheduledTasks scheduledTasks;

    //  Получить статус проверки вкл/выкл
    @Operation(summary = "Get scheduler Status ", tags = "scheduler",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @GetMapping("/get-status")
    public ResponseEntity<SimpleMessageResponse> schedulerStatus() {

        return ResponseEntity.ok(new SimpleMessageResponse(String.valueOf(scheduledTasks.isEnabledSchedule())));
    }

    //  Включить/выключить проверку
    @Operation(summary = "Get off scheduler", tags = "scheduler",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @PostMapping("/off")
    public ResponseEntity<SimpleMessageResponse> schedulerOff() {

        scheduledTasks.setEnabledScheduleOF();

        return ResponseEntity.ok(new SimpleMessageResponse("Scheduler is now OFF"));
    }

    @Operation(summary = "Get on scheduler", tags = "scheduler",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @PostMapping("/on")
    public ResponseEntity<SimpleMessageResponse> schedulerOn() {

        scheduledTasks.setEnabledScheduleOn();

        return ResponseEntity.ok(new SimpleMessageResponse("Scheduler is now ON"));
    }

    @Operation(summary = "Get off Schedule Notification", tags = "scheduler",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @PostMapping("/schedule-notification/off")
    public ResponseEntity<SimpleMessageResponse> scheduleNotificationOff() {

        scheduledTasks.setEnabledScheduleNotificationOff();

        return ResponseEntity.ok(new SimpleMessageResponse("schedule Notification is now OFF"));
    }

    @Operation(summary = "Get on Schedule Notification", tags = "scheduler",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @PostMapping("/schedule-notification/on")
    public ResponseEntity<SimpleMessageResponse> scheduleNotificationOn() {

        scheduledTasks.setEnabledScheduleNotificationOn();

        return ResponseEntity.ok(new SimpleMessageResponse("schedule Notification is now OFF"));
    }

    //  Узнать значение переодичности проверки
    @Operation(summary = "get scheduled rate", tags = "scheduler",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @GetMapping("/get-scheduled-rate")
    public ResponseEntity<SimpleMessageResponse> getScheduledRate() {

        return ResponseEntity.ok(new SimpleMessageResponse(String.valueOf(scheduledTasks.getFixedRate().get())));
    }

    //  Установить новое период проверки (в сек)
    @Operation(summary = "Set scheduled rate", tags = "scheduler",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @PostMapping("/change-scheduled-rate/{new-scheduled-rate}")
    public ResponseEntity<SimpleMessageResponse> changeScheduledRate(@PathVariable("new-scheduled-rate") int newScheduledRate) {

        scheduledTasks.setFixedRate(newScheduledRate);

        return ResponseEntity.ok(new SimpleMessageResponse("Scheduled Rate changed to: " + newScheduledRate + " sec"));
    }

    //  Получение таймаута отклика сервера
    @Operation(summary = "Get timeout", tags = "scheduler",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @GetMapping("/get-timeout")
    public ResponseEntity<SimpleMessageResponse> getTimeout() {

        return ResponseEntity.ok(new SimpleMessageResponse(String.valueOf(scheduledTasks.getTimeout())));
    }

    //  Смена таймаута ответа сервера
    @Operation(summary = "Set timeout", tags = "scheduler",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @PostMapping("/changeTimeout/{new-timeout}")
    public ResponseEntity<SimpleMessageResponse> changeTimeout(@PathVariable("new-timeout") int newTimeout) {

        scheduledTasks.setTimeout(newTimeout);

        return ResponseEntity.ok(new SimpleMessageResponse(("Timeout changed to: " + newTimeout + " nanoOfSecond.")));
    }
}
