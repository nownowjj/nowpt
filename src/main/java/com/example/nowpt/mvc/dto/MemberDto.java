package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class MemberDto {
    private Long membSn;
    private String membNm;
    private String membId;

}
