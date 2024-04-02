package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemoDto {
    private Long memoSn;
    private String title;
    private String content;
    private String useYn;
    private long memberSn;
    private LocalDateTime frstRegistDt;
    private LocalDateTime lastChangeDt;

}
