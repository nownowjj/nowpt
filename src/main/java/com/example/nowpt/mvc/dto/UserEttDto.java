package com.example.nowpt.mvc.dto;

import lombok.Data;

@Data
public class UserEttDto {
    private int exp;
    private int iat;
    private String membEmail = null;
    private String membId;
    private String membPw;
    private String roles;
}
