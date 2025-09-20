package com.example.schedulerservice.exeption;

import org.springframework.http.HttpStatus;

public class StorageDataNotFoundException extends ResourceNotFoundException {
    public StorageDataNotFoundException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
