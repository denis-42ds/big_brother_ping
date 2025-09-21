package com.example.schedulerservice.utils;


import com.example.schedulerservice.exeption.PhoneFormatException;
import lombok.RequiredArgsConstructor;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RequiredArgsConstructor
public class PhoneUtils {

    public static final String PHONE_REGEX = "(\\+7|7|8)\\d{10}";

    private static boolean isValidPhoneNumber(String phoneNumber) {
        return phoneNumber.matches(PHONE_REGEX);
    }

    public static String convertToStandardFormat(String phoneNumber) {
        if (!isValidPhoneNumber(phoneNumber))
            throw new PhoneFormatException("Phone must start with either +7, 7 or 8 and contain 11 digits");
        final Matcher matcher = Pattern.compile(PHONE_REGEX).matcher(phoneNumber);
        matcher.find();
        int prefixLength = matcher.group(1).length();
        return "+7" + phoneNumber.substring(prefixLength);
    }
}
