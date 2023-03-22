package com.example.nowpt.mvc.restcontoller.room;

import com.example.nowpt.cmm.code.ApiCd;
import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.RVO;
import com.example.nowpt.mvc.dto.RoomCreateDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.RequestStatus;
import com.example.nowpt.mvc.model.Room;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth/room")
public class RoomCreateRestController {
    private final RoomCreateService roomCreateService;


    @RequestMapping("/create")
    @PostMapping
    public RVO<Room> createRoom(@AuthenticationPrincipal Member member, @RequestBody RoomCreateDto roomCreateDto){
        log.debug("방 생성!");

        // 방 생성 전에  생성 횟수 확인
        int result = roomCreateService.selectCountsRoom(member.getMemberSn());

        if(result > 0 ){
            return RVO.<Room>builder()
                    .msg(Cd.POST_FAIL + result + RequestStatus.REFUSE)
                    .code(ApiCd.DEFAULT_ERR)
                    .data(null)
                    .build();
        }else {
            return RVO.<Room>builder()
                    .msg(Cd.POST_SUCCESS)
                    .code(ApiCd.NORMAL)
                    .data(roomCreateService.createRoom(member.getMemberSn(), roomCreateDto))
                    .build();
        }
    }
}
