package com.example.schedulerservice.mapper;

import com.example.schedulerservice.model.dto.response.UserInfoResponseDto;
import com.example.schedulerservice.model.dto.response.UserResponseDto;
import com.example.schedulerservice.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserInfoMapper {

    UserResponseDto toUserResponseDto(User newUser);


    UserInfoResponseDto toResponseUserInfoDto(User user);
}
