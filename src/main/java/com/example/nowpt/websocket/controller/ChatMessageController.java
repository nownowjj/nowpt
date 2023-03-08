package com.example.nowpt.websocket.controller;

import com.example.nowpt.websocket.dto.ChatMessageForm;
import com.example.nowpt.websocket.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat/send")
    public void sendMsg(ChatMessageForm message) {
        String receiver = message.getReceiver();
        System.out.println(receiver);
        chatMessageService.save(message);
        simpMessagingTemplate.convertAndSend("/topic/" + receiver,message);
    }

}
