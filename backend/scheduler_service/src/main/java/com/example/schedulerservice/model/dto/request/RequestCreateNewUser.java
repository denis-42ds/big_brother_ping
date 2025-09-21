package com.example.schedulerservice.model.dto.request;



import com.example.schedulerservice.model.constant.Role;
import com.example.schedulerservice.utils.PhoneUtils;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestCreateNewUser {

    @NotNull(message = "{validation.firstNameNull.message}")
    @Pattern(regexp = "^(?=^.{1,30}$)[А-ЯЁA-Z](([-'\\sА-ЯЁA-Zа-яёa-z])*[А-ЯЁA-Zа-яёa-z])?$",
            message = "{validation.firstName.message}")
    private String firstName;

    @NotNull(message = "{validation.lastNameNull.message}")
    @Pattern(regexp = "^(?=^.{1,30}$)[А-ЯЁA-Z](([-'\\sА-ЯЁA-Zа-яёa-z])*[А-ЯЁA-Zа-яёa-z])?$",
            message = "{validation.lastName.message}")
    private String lastName;

    @NotNull(message = "{validation.phone.message}")
    @Pattern(regexp = PhoneUtils.PHONE_REGEX, message = "{validation.phone.message}")
    private String mobilePhone;

    @NotNull(message = "{validation.role.message}")
    private Role role;

    private String userChatId;
}
