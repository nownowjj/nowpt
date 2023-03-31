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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        int count = roomCreateService.selectCountsRoom(member.getMemberSn());

        // 방은 3회까지만 생성 가능
        if(count >= 3){
            return RVO.<Room>builder()
                    .msg(Cd.POST_FAIL + "3회 이상 방을 생성하였습니다.")
                    .code(ApiCd.DEFAULT_ERR)
                    .data(null)
                    .build();
        }else{
            return RVO.<Room>builder()
                    .msg(Cd.POST_SUCCESS)
                    .code(ApiCd.NORMAL)
                    .data(roomCreateService.createRoom(member.getMemberSn(), roomCreateDto))
                    .build();
        }
    }
}
