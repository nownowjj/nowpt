package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDto {
    private Long scheduleSn;
    private String startDate;
    private String endDate;
    private long memberSn;
    private String color;
    private String title;
    private LocalDateTime frstRegistDt;
    private LocalDateTime lastChangeDt;

}
