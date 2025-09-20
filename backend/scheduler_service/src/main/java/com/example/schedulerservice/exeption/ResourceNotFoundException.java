package com.example.schedulerservice.exeption;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ResourceNotFoundException extends RuntimeException {

    private final HttpStatus status;

    public ResourceNotFoundException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
