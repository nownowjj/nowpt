package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarSmDto {
    private String year;
    private String month;
    private Long monthCount;
}
