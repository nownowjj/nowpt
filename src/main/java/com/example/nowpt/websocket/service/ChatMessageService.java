package com.example.nowpt.websocket.service;

import com.example.nowpt.service.AuthService;
import com.example.nowpt.websocket.dto.ChatMessageForm;
import com.example.nowpt.websocket.model.ChatMessage;
import com.example.nowpt.websocket.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final AuthService userService;
    private final ChatRoomService chatRoomService;
    @Transactional
    public void save(ChatMessageForm message) {
        ChatMessage chatMessage = new ChatMessage(message.getMessage(), LocalDateTime.now(),chatRoomService.findById(message.getChatRoomId()).get()
                ,userService.findUserByEmailMethod(message.getSender()));
        chatMessageRepository.save(chatMessage);
//        noticeService.addMessageNotice(chatMessage.getChatRoom(),chatMessage.getWriter(), message.getReceiver(),chatMessage.getTime());
    }
}
