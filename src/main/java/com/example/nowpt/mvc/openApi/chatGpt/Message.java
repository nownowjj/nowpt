package com.example.nowpt.mvc.openApi.chatGpt;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class Message {
    private String role;
    private String content;

    // Constructors, getters, and setters (or Lombok annotations) for the fields
}