package com.example.nowpt.mvc.model;

/**
 * BEFORE : 요청 전
 * WAIT   : 요청 대기
 * ACCEPT : 요청 허용
 * REFUSE : 요청 거절
 */
public enum RequestStatus {
   BEFORE("BEFORE"),
   WAIT("WAIT"),
   ACCEPT("ACCEPT"),
   REFUSE("REFUSE");

   private final String dbValue;

   RequestStatus(String dbValue) {
      this.dbValue = dbValue;
   }

   public String getDbValue() {
      return dbValue;
   }
}
