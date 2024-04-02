package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarDto {
    private String recordDate;
    private long memberSn;
    private Long calendarSn;
    private String title;
    private String content;
    private LocalDateTime frstRegistDt;
    private LocalDateTime lastChangeDt;
    private String useYn;
    private boolean importYn;
    private long commentCount;

    // importYn 필드의 접근자 메서드 정의
    public boolean getImportYn() {
        return importYn;
    }

    // importYn 필드의 설정자 메서드 정의
    public void setImportYn(boolean importYn) {
        this.importYn = importYn;
    }
}
