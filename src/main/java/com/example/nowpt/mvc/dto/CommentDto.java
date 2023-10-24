package com.example.nowpt.mvc.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private long calendarSn; // 댓글 캘린더 Sn
    private String commentContent; // 댓글 내용
    private long membSn; // 작성자 Sn

    private String profileImage; // 댓글 작성자 프로필
    private String membNm; // 작성자 성함
    private LocalDateTime frstRegistDt; // 댓글 작성 시간
    private String useYn; // 댓글 사용여부
    private long commentSn; //댓글 sn

}
