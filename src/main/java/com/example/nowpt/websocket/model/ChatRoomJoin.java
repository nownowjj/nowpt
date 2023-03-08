package com.example.nowpt.websocket.model;

import com.example.nowpt.mvc.model.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomJoin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "join_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name =  "memb_sn")
    private Member user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;

    public ChatRoomJoin(Member user , ChatRoom chatRoom){
        this.user = user;
        this.chatRoom = chatRoom;
    }
}
