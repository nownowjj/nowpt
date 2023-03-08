package com.example.nowpt.websocket.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDto {
    private Long senderId;
    private String senderName;
    private String senderEmail;
    private List<ChatRoomForm> chatRooms;
}

