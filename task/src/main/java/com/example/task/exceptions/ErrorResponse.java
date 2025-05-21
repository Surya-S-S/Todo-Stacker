package com.example.task.exceptions;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
 
    private HttpStatus statusCode;
    private String message;
 
    public ErrorResponse(String message) {
        this.message = message;
    }
}
