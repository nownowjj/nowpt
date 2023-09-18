package com.example.nowpt.mvc.openApi.chatGpt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth/chat-gpt")
@Slf4j
public class ChatGptController {

    private final ChatGptService chatGPTService;

    @Autowired
    public ChatGptController(ChatGptService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    @PostMapping("/chat")
    public String chatWithGPT(@RequestBody ChatGptRequestDto requestDto) {
        // Call the ChatGPT service to get the response
        String response = chatGPTService.getChatGPTResponse(requestDto);
        // Process the response as needed
        return response;
    }
}