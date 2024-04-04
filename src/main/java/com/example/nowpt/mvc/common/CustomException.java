package com.example.nowpt.mvc.common;

public class CustomException extends RuntimeException {
    public CustomException(String message) {
        super(message);
    }
}