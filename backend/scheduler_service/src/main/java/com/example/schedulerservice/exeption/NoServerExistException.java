package com.example.schedulerservice.exeption;

public class NoServerExistException extends RuntimeException{

    public NoServerExistException(String message) {
        super(message);
    }
}
