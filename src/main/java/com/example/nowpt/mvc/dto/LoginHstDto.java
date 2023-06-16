package com.example.nowpt.mvc.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginHstDto {
    private String data_one;
    private Long data_two;
    private Long data_three;
    private Long data_four;
//    private Long data_five; -- 해당 컬럼은 중복을 제거한 누적 신규 유저

//    @QueryProjection  -- QDto는 필요 없을 것 같음
//    public LoginHstDto(String data_one , Long data_two ,Long data_three ,Long data_four) {
//        this.data_one = data_one;
//        this.data_two = data_two;
//        this.data_three = data_three;
//        this.data_four = data_four;
////        this.data_five = data_five;
//    }
}
