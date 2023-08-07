package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendDto {
    private boolean acceptYn; // 수락 여부
    private long friendSn;

    public boolean getAcceptYn() {
        return acceptYn;
    }
}
