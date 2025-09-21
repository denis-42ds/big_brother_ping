package com.example.schedulerservice.controller;


import com.example.schedulerservice.handler.ErrorResponse;
import com.example.schedulerservice.model.dto.request.CreateSingleServerRequest;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;
import com.example.schedulerservice.utils.ScheduledSingleTasks;
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
@RequestMapping("/server-status/singleScheduler")
public class SingleSchedulerController {

    private final ScheduledSingleTasks scheduledSingleTask;

    //  Получить статус проверки вкл/выкл
    @Operation(summary = "Get scheduler Status for single server", tags = "singleScheduler",
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

        return ResponseEntity.ok(new SimpleMessageResponse(String.valueOf(scheduledSingleTask.isEnabledSingleSchedule())));
    }
//    установить UUID
    @Operation(summary = "Create Single Server Request for single server", tags = "singleScheduler",
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
    @PostMapping("/single-server-id")
    public ResponseEntity<SimpleMessageResponse> setSchedulerServerId(CreateSingleServerRequest singleServersRequest) {

        scheduledSingleTask.setServerId(singleServersRequest.items());

        return ResponseEntity.ok(new SimpleMessageResponse("Scheduler is now OFF"));
    }

    //  Включить/выключить проверку
    @Operation(summary = "Get off scheduler for single server", tags = "singleScheduler",
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

        scheduledSingleTask.setSingleScheduleOF();

        return ResponseEntity.ok(new SimpleMessageResponse("Scheduler is now OFF"));
    }

    @Operation(summary = "Get on scheduler for single server", tags = "singleScheduler",
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

        scheduledSingleTask.setSingleScheduleOn();

        return ResponseEntity.ok(new SimpleMessageResponse("Scheduler is now ON"));
    }
    @Operation(summary = "Get off single Schedule Notification", tags = "singleScheduler",
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
    @PostMapping("/single-schedule-notification/off")
    public ResponseEntity<SimpleMessageResponse> singleScheduleNotificationOff() {

      scheduledSingleTask.setSingleScheduleNotificationOff();

        return ResponseEntity.ok(new SimpleMessageResponse("schedule Notification is now OFF"));
    }

    @Operation(summary = "Get on singleSchedule Notification", tags = "singleScheduler",
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
    @PostMapping("/single-schedule-notification/on")
    public ResponseEntity<SimpleMessageResponse> singleScheduleNotificationOn() {

        scheduledSingleTask.setSingleScheduleNotificationOn();

        return ResponseEntity.ok(new SimpleMessageResponse("schedule Notification is now OFF"));
    }

    //  Узнать значение переодичности проверки
    @Operation(summary = "get scheduled rate for single server", tags = "singleScheduler",
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
    @GetMapping("/get-scheduled-rate ")
    public ResponseEntity<SimpleMessageResponse> getScheduledRate() {

        return ResponseEntity.ok(new SimpleMessageResponse(String.valueOf(scheduledSingleTask.getSingleFixedRate().get())));
    }

    //  Установить новое период проверки (в сек)
    @Operation(summary = "Set scheduled rate for single server", tags = "singleScheduler",
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

        scheduledSingleTask.setSingleFixedRate(newScheduledRate);

        return ResponseEntity.ok(new SimpleMessageResponse("Scheduled Rate changed to: " + newScheduledRate + " sec"));
    }

    //  Получение таймаута отклика сервера
    @Operation(summary = "Get timeout for single server", tags = "singleScheduler",
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

        return ResponseEntity.ok(new SimpleMessageResponse(String.valueOf(scheduledSingleTask.getSingleTaskTimeout())));
    }

    //  Смена таймаута ответа сервера
    @Operation(summary = "Set timeout for single server", tags = "singleScheduler",
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

        scheduledSingleTask.setSingleTaskTimeout(newTimeout);

        return ResponseEntity.ok(new SimpleMessageResponse(("Timeout changed to: " + newTimeout + " nanoOfSecond.")));
    }
}
