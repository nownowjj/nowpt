package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalenderDto {
    private String recordDate;
    private long memberSn;
    private long calendarSn;
    private String title;
    private String content;
    private LocalDateTime frstRegistDt;
    private LocalDateTime lastChangeDt;
    private String useYn;
}
