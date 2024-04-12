package com.example.nowpt.mvc.dto;

import lombok.Data;

@Data
public class EmailRequest {
    String to;
    String subject;
    String body;
}
