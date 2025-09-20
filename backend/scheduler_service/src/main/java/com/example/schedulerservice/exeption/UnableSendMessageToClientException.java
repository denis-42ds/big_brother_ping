package com.example.schedulerservice.exeption;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public class UnableSendMessageToClientException extends RuntimeException{

    private final HttpStatus httpStatus;
    public UnableSendMessageToClientException(HttpStatus httpStatus,String message){
        super(message);
        this.httpStatus = httpStatus;
    }
}
