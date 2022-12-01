package com.example.nowpt.mvc.dto;

public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    private String role ;

    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getRole(){
        return role;
    }

    public void setRole(String roles){this.role=roles;}
}