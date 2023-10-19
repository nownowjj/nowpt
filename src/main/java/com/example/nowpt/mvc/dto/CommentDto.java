package com.example.nowpt.mvc.dto;

import lombok.Data;

@Data
public class CommentDto {
    private long calendarSn;
    private String commentContent;
    private long membSn;
}
