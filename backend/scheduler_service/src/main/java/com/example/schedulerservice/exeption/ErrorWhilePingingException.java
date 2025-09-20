package com.example.schedulerservice.exeption;

public class ErrorWhilePingingException extends RuntimeException{
    public ErrorWhilePingingException(String message) {
        super(message);
    }
}
