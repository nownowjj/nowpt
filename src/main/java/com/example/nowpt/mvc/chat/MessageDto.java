package com.example.nowpt.mvc.chat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {

    private String type;

    private String sender;

    private String channelId;

    private Object data;
}