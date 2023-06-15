package com.example.nowpt.mvc.model;

/**
 * BEFORE : 요청 전
 * WAIT   : 요청 대기
 * ACCEPT : 요청 허용
 * REFUSE : 요청 거절
 */
public enum RequestStatus {
   BEFORE,
   WAIT,
   ACCEPT,
   REFUSE
}
