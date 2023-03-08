package com.example.nowpt.websocket.dto;

import com.example.nowpt.websocket.model.ChatMessage;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDetailDto {
    private Long senderId;
    private String senderName;
    private String senderEmail;
    private String receiverName;
    private List<ChatMessage> messages;
    private Long chatRoomId;

}
