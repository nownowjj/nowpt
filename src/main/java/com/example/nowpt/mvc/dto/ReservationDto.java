package com.example.nowpt.mvc.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    // 회의실 명
    private String meetingRoom;
    // 사용목적
    private String purpose;
    // 사용 일자("2023-01-09")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate useDay;
    // 시작시간
//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS]")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:01[.000]")
    private LocalDateTime useStartTime;
    // 종료시간
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:00[.999]")
    private LocalDateTime useEndTime;


}
