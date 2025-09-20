package com.example.schedulerservice.exeption;

public class FailedToResolveHostException extends RuntimeException {
    public FailedToResolveHostException(String message) {
        super(message);
    }
}
