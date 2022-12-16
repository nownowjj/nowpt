package com.example.nowpt.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class MemberDto {
    private Long memb_sn;
    private String memb_nm;
    private String memb_id;
    private String use_yn;
    private String email_addr;

}
