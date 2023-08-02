package com.example.nowpt.mvc.openApi.chatGpt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Configuration
public class ChatGptConfig {

    @Value("${chatgpt.api.endpoint}")
    private String apiEndpoint;

    @Value("${chatgpt.api.api-key}")
    private String apiKey;

    public HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);
        return headers;
    }

    public String getApiEndpoint() {
        return apiEndpoint;
    }
}
