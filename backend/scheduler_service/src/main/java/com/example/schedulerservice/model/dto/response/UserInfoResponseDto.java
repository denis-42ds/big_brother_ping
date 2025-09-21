package com.example.schedulerservice.model.dto.response;

import com.example.schedulerservice.model.constant.Role;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoResponseDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String mobilePhone;
    private Role userRole;
    private String userChatId;

}