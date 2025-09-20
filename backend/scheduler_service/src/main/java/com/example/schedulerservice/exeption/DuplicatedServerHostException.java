package com.example.schedulerservice.exeption;

public class DuplicatedServerHostException extends RuntimeException {
    public DuplicatedServerHostException(String message) {
        super(message);
    }
}
