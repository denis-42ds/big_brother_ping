package com.example.schedulerservice.controller;


import com.example.schedulerservice.handler.ErrorResponse;
import com.example.schedulerservice.model.dto.request.CreateRequestLog;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;
import com.example.schedulerservice.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/server-status/server-log/reports")
@Validated
@RequiredArgsConstructor
public class ReportsController {

    private final EmailService emailService;

    @Operation(summary = "Send email report for all servers", tags = "Report",
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
    @PostMapping("/send-all")
    public ResponseEntity<SimpleMessageResponse> sendReportAllServers(@RequestBody CreateRequestLog createRequestLog,
                                                                      @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size) {
        SimpleMessageResponse response = emailService.sendReportAllServers(createRequestLog.email(), createRequestLog, page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "Send email report for servers sort by name", tags = "Report",
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
    @PostMapping("/send-by-name/{name}")
    public ResponseEntity<SimpleMessageResponse> sendReportServersByName(@PathVariable("name") String serverName,
                                                                         @RequestBody CreateRequestLog createRequestLog,
                                                                         @RequestParam(defaultValue = "0") int page,
                                                                         @RequestParam(defaultValue = "10") int size) {
        SimpleMessageResponse response = emailService.sendReportServersByName(createRequestLog.email(), serverName, createRequestLog, page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "Send email report for servers sort by Url", tags = "Report",
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
    @PostMapping("/send-by-url/{url}")
    public ResponseEntity<SimpleMessageResponse> sendReportServersByUrl(@PathVariable("url") String serverUrl,
                                                                        @Valid @RequestBody CreateRequestLog createRequestLog,
                                                                        @RequestParam(defaultValue = "0") int page,
                                                                        @RequestParam(defaultValue = "10") int size) {
        SimpleMessageResponse response = emailService.sendReportServersByUrl(createRequestLog.email(), serverUrl, createRequestLog, page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "Send email report for servers sort by server status", tags = "Report",
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
    @PostMapping("/send-by-server-status/{status}")
    public ResponseEntity<SimpleMessageResponse> sendReportServerByServerStatus(@PathVariable("status") String serverStatus,
                                                                                @Valid @RequestBody CreateRequestLog createRequestLog,
                                                                                @RequestParam(defaultValue = "0") int page,
                                                                                @RequestParam(defaultValue = "10") int size) {
        SimpleMessageResponse response = emailService.sendReportServerByServerStatus(createRequestLog.email(), serverStatus, createRequestLog, page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}