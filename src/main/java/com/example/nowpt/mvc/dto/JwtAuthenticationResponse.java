package com.example.nowpt.mvc.dto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    private String role ;

    public JwtAuthenticationResponse(String accessToken) {
        log.debug("JwtAuthenticationResponse");
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        log.debug("getAccessToken");
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        log.debug("setAccessToken");
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        log.debug("setTokenType");
        this.tokenType = tokenType;
    }

    public String getRole(){
        return role;
    }

    public void setRole(String roles){
        log.debug("setRole");
        this.role=roles;
    }
}