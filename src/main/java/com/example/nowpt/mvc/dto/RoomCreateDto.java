package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.lang.Nullable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateDto {
    // 방 제목
    @NonNull
    private String roomTitle;
    // 공개 여부
    @NonNull
    private String openYn;
    // 방 비밀번호
    @Nullable
    private String roomPw;



}
