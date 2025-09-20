package com.example.schedulerservice.controller;

import com.example.schedulerservice.handler.ErrorResponse;
import com.example.schedulerservice.model.dto.ServerStatusDtoPage;
import com.example.schedulerservice.model.dto.CreateNewServerDtoList;
import com.example.schedulerservice.model.dto.request.CreateNewServerRequest;
import com.example.schedulerservice.model.dto.response.ServerStatusResponse;
import com.example.schedulerservice.model.dto.response.SimpleMessageResponse;
import com.example.schedulerservice.service.ServerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/server-status/server")
@RequiredArgsConstructor
public class ServerController {

    private final ServerService serverService;

    @Operation(summary = "Endpoint for add new server into DB", tags = "server",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Not found",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @PostMapping("/add")
    public ResponseEntity<SimpleMessageResponse> addNewServers(@RequestBody CreateNewServerDtoList createNewServerDtoList) {

        return ResponseEntity.ok(serverService.addNewServersIntoDB(createNewServerDtoList));
    }

    @Operation(summary = "Endpoint for find Server By Server Url", tags = "server",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = ServerStatusResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Not found",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @GetMapping("/find-by-url/{serverUrl}")
    public ResponseEntity<ServerStatusResponse> findServerByServerUrl(@PathVariable String serverUrl,
                                                                      @RequestParam int timeout) {

        return ResponseEntity.ok(serverService.findServerByServerUrl(serverUrl, timeout));
    }

    @Operation(summary = "Endpoint for find server by name", tags = "server",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = ServerStatusResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Not found",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @GetMapping("/find-by-name/{server-name}")
    public ResponseEntity<ServerStatusResponse> findServerByServerName(@PathVariable("server-name") String serverName,
                                                                       @RequestParam int timeout) {

        return ResponseEntity.ok(serverService.findServerByServerName(serverName, timeout));
    }

    @Operation(summary = "Endpoint for update Server", tags = "server",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = ServerStatusResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Not found",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @PutMapping("/update/{server-id}")
    public ResponseEntity<ServerStatusResponse> updateServer(@PathVariable("server-id") UUID serverId,
                                                             @RequestBody CreateNewServerRequest updateServer) {

        return ResponseEntity.ok(serverService.updateServer(serverId, updateServer));
    }

    @Operation(summary = "Endpoint for find find All Servers", tags = "server",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = ServerStatusDtoPage.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Not found",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @GetMapping("/find-all")
    public ResponseEntity<ServerStatusDtoPage> findAllServers(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(serverService.findAllServers(page, size));
    }

    @Operation(summary = "Endpoint for delete Server", tags = "server",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = SimpleMessageResponse.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Not found",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @DeleteMapping("/delete/{server-id}")
    public ResponseEntity<SimpleMessageResponse> deleteServer(@PathVariable("server-id") UUID serverId) {

        return ResponseEntity.ok(serverService.deleteServer(serverId));
    }
}