package com.example.nowpt.websocket.repository;

import com.example.nowpt.websocket.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

}
