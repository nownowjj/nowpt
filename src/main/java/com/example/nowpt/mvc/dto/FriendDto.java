package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendDto {
    private long friendSn;
    private String friendNm;
    private long friendMemberSn;
    private LocalDateTime frstRegistDt;
    private long memberSn;
    private String friendProfile;
    private String requestStatus;
    private boolean acceptYn; // 수락 여부

    public boolean getAcceptYn() {
        return acceptYn;
    }
}
