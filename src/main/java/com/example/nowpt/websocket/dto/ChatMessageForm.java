package com.example.nowpt.websocket.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageForm {
    private Long ChatRoomId;
    private String receiver;
    private String sender;
    private String message;
}
