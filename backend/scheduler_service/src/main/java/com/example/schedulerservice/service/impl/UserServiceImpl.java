package com.example.schedulerservice.service.impl;


//
import com.example.schedulerservice.exeption.DuplicatedPhoneException;
import com.example.schedulerservice.exeption.ResourceNotFoundException;
import com.example.schedulerservice.exeption.StorageDataNotFoundException;
import com.example.schedulerservice.mapper.UserInfoMapper;
import com.example.schedulerservice.model.dto.UserDtoList;
import com.example.schedulerservice.model.dto.request.RequestCreateNewUser;
import com.example.schedulerservice.model.dto.request.RequestUpdateUser;
import com.example.schedulerservice.model.dto.response.UserInfoResponseDto;
import com.example.schedulerservice.model.dto.response.UserMessageResponseDto;
import com.example.schedulerservice.model.dto.response.UserResponseDto;
import com.example.schedulerservice.model.entity.User;
import com.example.schedulerservice.repository.UserRepository;
import com.example.schedulerservice.service.UserService;
import com.example.schedulerservice.utils.PhoneUtils;
import com.example.schedulerservice.utils.UserServiceMessages;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserInfoMapper userInfoMapper;


    @Override
    @Transactional
    public UserResponseDto createNewUser(RequestCreateNewUser requestCreateNewUser) {

        String newUserPhoneNumber = PhoneUtils.convertToStandardFormat(requestCreateNewUser.getMobilePhone());

        phoneNumberCheck(newUserPhoneNumber);
        User newUser = User.builder()
                .firstName(requestCreateNewUser.getFirstName())
                .lastName(requestCreateNewUser.getLastName())
                .mobilePhone(newUserPhoneNumber)
                .userRole(requestCreateNewUser.getRole())
                .build();

        userRepository.save(newUser);

        return userInfoMapper.toUserResponseDto(newUser);
    }

    @Override
    public UserInfoResponseDto findUserByMobilePhone(String mobilePhone) {

        User user = userRepository.findByMobilePhone(PhoneUtils.convertToStandardFormat(mobilePhone)).orElseThrow(()
                -> new StorageDataNotFoundException(UserServiceMessages.userNotFoundWithPhoneNumberMessage + mobilePhone));



        return userInfoMapper.toResponseUserInfoDto(user);
    }

    @Override
    public UserResponseDto findUserById(UUID userId) {

        return userInfoMapper.toUserResponseDto(userCheck(userId));
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public UserResponseDto updateUser(UUID userId, RequestUpdateUser requestUpdateUser) {

        phoneNumberCheck(requestUpdateUser.mobilePhone());

        User updatedUser = userCheck(userId);

        updatedUser.setFirstName(requestUpdateUser.firstName());
        updatedUser.setLastName(requestUpdateUser.lastName());
        updatedUser.setMobilePhone(PhoneUtils.convertToStandardFormat(requestUpdateUser.mobilePhone()));

        userRepository.save(updatedUser);

        return userInfoMapper.toUserResponseDto(updatedUser);
    }

    @Override
    @Transactional
    public UserMessageResponseDto deleteUser(UUID userId) {

        userRepository.deleteById(userCheck(userId).getId());

        return UserMessageResponseDto.builder()
                .userMessage(UserServiceMessages.userDeleted + userId)
                .build();
    }

    @Override
    public UserDtoList allUsers() {

        List<User> userList = userRepository.findAll();

        List<UserInfoResponseDto> users = userList.stream()
                .map(user -> findUserByMobilePhone(user.getMobilePhone()))
                .toList();

        return new UserDtoList(users);
    }

    private void phoneNumberCheck(String mobilePhone) {

        userRepository.findByMobilePhone(mobilePhone)
                .ifPresent(user -> {
                    throw new DuplicatedPhoneException(UserServiceMessages.phoneIsAlreadyInUseMessage);
                });
    }

    private User userCheck(UUID userId) {

        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(HttpStatus.NOT_FOUND,
                        UserServiceMessages.userProfileNotFoundMessage));
    }
}
