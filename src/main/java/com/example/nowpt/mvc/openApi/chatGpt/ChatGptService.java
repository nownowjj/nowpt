package com.example.nowpt.mvc.openApi.chatGpt;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class ChatGptService {
    private final RestTemplate restTemplate;
    private final ChatGptConfig chatGPTConfig;

    @Autowired
    public ChatGptService(RestTemplate restTemplate, ChatGptConfig chatGPTConfig) {
        this.restTemplate = restTemplate;
        this.chatGPTConfig = chatGPTConfig;
    }

    public String getChatGPTResponse(ChatGptRequestDto requestDto) {
        String url = chatGPTConfig.getApiEndpoint() + "/v1/chat/completions";
        HttpHeaders headers = chatGPTConfig.getHeaders();

        // Convert the requestDto to JSON string
        String requestBody = new Gson().toJson(requestDto);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        // Send a POST request to the ChatGPT API
        String response = restTemplate.postForObject(url, request, String.class);

        return response;
    }
}