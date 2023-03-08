package com.example.nowpt.websocket.repository;

import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.websocket.model.ChatRoom;
import com.example.nowpt.websocket.model.ChatRoomJoin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomJoinRepository extends JpaRepository<ChatRoomJoin,Long> {
    List<ChatRoomJoin> findByUser(Member user);
    List<ChatRoomJoin> findByChatRoom(ChatRoom chatRoom);
}
