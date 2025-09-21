package com.example.schedulerservice.exeption;

public class DuplicatedPhoneException extends RuntimeException {
    public DuplicatedPhoneException(String message) {
        super(message);
    }
}
