package com.example.schedulerservice.service;

import com.example.schedulerservice.model.dto.UserDtoList;
import com.example.schedulerservice.model.dto.request.RequestCreateNewUser;
import com.example.schedulerservice.model.dto.request.RequestUpdateUser;
import com.example.schedulerservice.model.dto.response.UserInfoResponseDto;
import com.example.schedulerservice.model.dto.response.UserMessageResponseDto;
import com.example.schedulerservice.model.dto.response.UserResponseDto;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface UserService {
    @Transactional
    UserResponseDto createNewUser(RequestCreateNewUser requestCreateNewUser);

    UserInfoResponseDto findUserByMobilePhone(String mobilePhone);

    UserResponseDto findUserById(UUID userId);

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    UserResponseDto updateUser(UUID userId, RequestUpdateUser requestUpdateUser);

    @Transactional
    UserMessageResponseDto deleteUser(UUID userId);

    UserDtoList allUsers();
}
