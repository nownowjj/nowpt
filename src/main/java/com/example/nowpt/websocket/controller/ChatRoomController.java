package com.example.nowpt.websocket.controller;

import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.service.AuthService;
import com.example.nowpt.websocket.dto.ChatRoomDetailDto;
import com.example.nowpt.websocket.dto.ChatRoomDto;
import com.example.nowpt.websocket.dto.ChatRoomForm;
import com.example.nowpt.websocket.model.ChatMessage;
import com.example.nowpt.websocket.model.ChatRoom;
import com.example.nowpt.websocket.model.ChatRoomJoin;
import com.example.nowpt.websocket.service.ChatRoomJoinService;
import com.example.nowpt.websocket.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class ChatRoomController {
    private final AuthService userService;
    private final ChatRoomJoinService chatRoomJoinService;
    private final ChatRoomService chatRoomService;


    //항해톡 버튼 눌렀을때 -> room.html
    @GetMapping("/api/chat")
    @ResponseBody
    public Object chatHome(@RequestParam("email") String email) {
        ChatRoomDto chatRoomDto = new ChatRoomDto();

        chatRoomDto.setSenderEmail(email);

        Member user = userService.findUserByEmailMethod(email);
        List<ChatRoomJoin> chatRoomJoins = chatRoomJoinService.findByUser(user);
        List<ChatRoomForm> chatRooms = chatRoomService.setting(chatRoomJoins, user);

        chatRoomDto.setChatRooms(chatRooms);

        if (user == null) {
            chatRoomDto.setSenderName("");
            chatRoomDto.setSenderId(0L);
        } else {
            chatRoomDto.setSenderName(user.getUsername());
            chatRoomDto.setSenderId(user.getMemberSn());
        }
        return chatRoomDto;
    }


    //바로 채팅버튼 눌렀을 때 -> roomdetail.html
    @PostMapping("/api/chat/newChat")
    public String newChat(@RequestParam("receiver") String receiverEmail, @RequestParam("sender") String senderEmail) {//, RedirectAttributes redirectAttributes
        Long chatRoomId = chatRoomJoinService.newRoom(receiverEmail, senderEmail);
//        redirectAttributes.addAttribute("email",user2);
        return "redirect:/personalChat/?chatRoomId=" + chatRoomId + "&email=" + senderEmail;
//        return "redirect:/personalChat/" + chatRoomId;
    }

    @RequestMapping(value = {"/personalChat"})
    @ResponseBody
    public Object goChat(@RequestParam("chatRoomId") Long chatRoomId, @RequestParam("email") String senderEmail) {
//        String email = (String) request.getAttribute("userEmail");
        Member userByEmailMethod = userService.findUserByEmailMethod(senderEmail);
        Optional<ChatRoom> opt = chatRoomService.findById(chatRoomId);
        ChatRoom chatRoom = opt.get();
        List<ChatMessage> messages = chatRoom.getMessages();
        Collections.sort(messages, (t1, t2) -> {
            if (t1.getId() > t2.getId()) return -1;
            else return 1;
        });

        ChatRoomDetailDto chatRoomDetailDto = new ChatRoomDetailDto();

        if (userByEmailMethod == null) {
            chatRoomDetailDto.setSenderName("");
            chatRoomDetailDto.setSenderId(0L);
        } else {
            chatRoomDetailDto.setSenderName(userByEmailMethod.getUsername());
            chatRoomDetailDto.setSenderId(userByEmailMethod.getMemberSn());
        }
        List<ChatRoomJoin> list = chatRoomJoinService.findByChatRoom(chatRoom);
        chatRoomDetailDto.setMessages(messages);
        chatRoomDetailDto.setSenderEmail(userByEmailMethod.getEmailAddr());
        chatRoomDetailDto.setChatRoomId(chatRoomId);
        int cnt = 0;
        for (ChatRoomJoin join : list) {
            if (!join.getUser().getUsername().equals(userByEmailMethod.getUsername())) {
                chatRoomDetailDto.setReceiverName(join.getUser().getUsername());
                ++cnt;
            }
        }
        if (cnt >= 2) {
            return "redirect:/api/chat";
        }
        if (cnt == 0) {
            chatRoomDetailDto.setReceiverName("");
        }
        return chatRoomDetailDto;
    }


}

