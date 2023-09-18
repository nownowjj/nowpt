package com.example.nowpt.mvc.openApi.chatGpt;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Getter
@NoArgsConstructor
public class ChatGptRequestDto {
    private String model;
    private List<Message> messages;

    // Constructors, getters, and setters (or Lombok annotations) for the fields
}
