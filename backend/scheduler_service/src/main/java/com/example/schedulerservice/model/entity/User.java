package com.example.schedulerservice.model.entity;


import com.example.schedulerservice.model.constant.Role;
import com.example.schedulerservice.model.constant.ServerStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.util.UUID;


@Entity
@Table(name = "users_for_ping")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Id")
    private UUID id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "mobile_phone")
    @Pattern(regexp = "\\+7\\d{10}",
            message = "Mobile phone must start with +7 and contain 11 digits")
    private String mobilePhone;

    @Column(name = "user_role")
    @Enumerated(EnumType.STRING)
    Role userRole;

    @Column(name = "user_chat_id")
    String userChatId;
}
