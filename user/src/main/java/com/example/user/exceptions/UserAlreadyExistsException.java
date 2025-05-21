package com.example.user.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ResponseStatus(value = HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends RuntimeException {
    
    private String message;

    public UserAlreadyExistsException(String message) {
        super(message);
        this.setMessage(message);
    }
}
