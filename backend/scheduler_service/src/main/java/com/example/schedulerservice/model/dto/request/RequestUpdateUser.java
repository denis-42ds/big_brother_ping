package com.example.schedulerservice.model.dto.request;


import com.example.schedulerservice.model.constant.Role;
import com.example.schedulerservice.utils.PhoneUtils;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

public record RequestUpdateUser(

        @NotNull(message = "{validation.firstNameNull.message}")
        @Pattern(regexp = "^(?=^.{1,30}$)[А-ЯЁA-Z](([-'\\sА-ЯЁA-Zа-яёa-z])*[А-ЯЁA-Zа-яёa-z])?$",
                message = "{validation.firstName.message}")
        String firstName,

        @NotNull(message = "{validation.lastNameNull.message}")
        @Pattern(regexp = "^(?=^.{1,30}$)[А-ЯЁA-Z](([-'\\sА-ЯЁA-Zа-яёa-z])*[А-ЯЁA-Zа-яёa-z])?$",
                message = "{validation.lastName.message}")
        String lastName,

        @NotNull(message = "{validation.phone.message}")
        @Pattern(regexp = PhoneUtils.PHONE_REGEX, message = "{validation.phone.message}")
        String mobilePhone,
        @NotNull(message = "{validation.role.message}")
        Role role,

        String userChatId

) {
    @Builder
    public RequestUpdateUser {
    }
}
