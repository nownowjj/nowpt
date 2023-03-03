package com.example.nowpt.social;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class OAuthNaverService {
    @Value("${naverLogin.clientId}") private String NAVER_CLIENT_ID ;
    @Value("${naverLogin.clientSecret}") private String NAVER_CLIENT_SECRET;

    public String getAccessToken(@RequestParam String code, @RequestParam String state) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", NAVER_CLIENT_ID);
        body.add("client_secret", NAVER_CLIENT_SECRET);
        body.add("code", code);
        body.add("state", state);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> naverTokenRequest =
                new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                naverTokenRequest,
                String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        log.debug("jsonNode : {}" , jsonNode.get("access_token").asText());
        return jsonNode.get("access_token").asText();
    }

    public JsonNode getNaverUserInfo(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> naverUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                naverUserInfoRequest,
                String.class
        );

        // HTTP 응답 받아오기
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
//        log.debug("최종 jsonNode : {}" , jsonNode);
//
//        String message = jsonNode.get("message").asText();
//
//        String id = jsonNode.get("response").get("id").asText();
//        String nickname = jsonNode.get("response").get("nickname").asText();
//        String profileImage = jsonNode.get("response").get("profile_image").asText();
//        String email = jsonNode.get("response").get("email").asText();
//        String originMobile = jsonNode.get("response").get("mobile").asText();
//        String mobile = originMobile.replace("-","");
//
//        log.debug("최종 성공여부 : {}" ,message);
//        log.debug("최종 id : {}" ,id);
//        log.debug("최종 nickname : {}" ,nickname);
//        log.debug("최종 profile : {}" ,profileImage);
//        log.debug("최종 email : {}" ,email);
//        log.debug("최종 mobile : {}" ,mobile);

        return jsonNode;
    }

}
