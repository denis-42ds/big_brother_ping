package com.example.schedulerservice.controller;

import com.example.schedulerservice.handler.ErrorResponse;
import com.example.schedulerservice.model.dto.UserDtoList;
import com.example.schedulerservice.model.dto.request.RequestCreateNewUser;
import com.example.schedulerservice.model.dto.request.RequestUpdateUser;
import com.example.schedulerservice.model.dto.response.UserInfoResponseDto;
import com.example.schedulerservice.model.dto.response.UserMessageResponseDto;
import com.example.schedulerservice.model.dto.response.UserResponseDto;
import com.example.schedulerservice.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/users")
public class UserController {


    private final UserService userService;

    @Operation(summary = "Endpoint for create user", tags = "create",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = UserResponseDto.class)))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @PostMapping(value = "/create")
    ResponseEntity<UserResponseDto> createNewUser(@RequestBody @Valid RequestCreateNewUser requestCreateNewUser){
        return ResponseEntity.ok(userService.createNewUser(requestCreateNewUser));
    }

    @Operation(summary = "Endpoint for find user by mobile phone", tags = "find",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = UserInfoResponseDto.class)))),
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
    @GetMapping(value = "/find")
    ResponseEntity<UserInfoResponseDto> findUserByPhone(@RequestParam String phoneNumber){
        return ResponseEntity.ok(userService.findUserByMobilePhone(phoneNumber));
    }

    @Operation(summary = "Endpoint for find user by Id", tags = "find",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = UserResponseDto.class)))),
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
    @GetMapping(value = "/find/id")
    ResponseEntity<UserResponseDto> findUserById(@RequestParam UUID userId){
        return ResponseEntity.ok(userService.findUserById(userId));
    }

    @Operation(summary = "Endpoint for update user", tags = "update",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = UserResponseDto.class)))),
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
    @PatchMapping(value = "/update")
    ResponseEntity<UserResponseDto> updateUser(@RequestParam UUID userId,
                                               @RequestBody @Valid RequestUpdateUser requestUpdateUser){
        return ResponseEntity.ok(userService.updateUser(userId, requestUpdateUser));
    }

    @Operation(summary = "Endpoint for delete user", tags = "delete",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = UserMessageResponseDto.class)))),
                    @ApiResponse(responseCode = "404", description = "Not found",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @DeleteMapping(value = "/delete")
    ResponseEntity<UserMessageResponseDto> deleteUser(@RequestParam UUID userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @Operation(summary = "Endpoint for find all users", tags = "find",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Success",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = UserInfoResponseDto.class)))),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)))
            })
    @GetMapping(value = "/all")
    ResponseEntity<UserDtoList> findAllUsers(){
        return ResponseEntity.ok(userService.allUsers());
    }
}
