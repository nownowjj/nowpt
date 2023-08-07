package com.example.nowpt.mvc.restcontoller.friend;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.model.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class FriendRestController {

    /**
     * @return 친구 목록에서 친구 신청을 보냄
     */
    @PostMapping("/api/auth/friend/apply/{friendSn}")
    public ResponseDto<?> insertFriend(@AuthenticationPrincipal Member member, @PathVariable Long friendSn){
        log.debug("본인 sn : {} , 친구 sn : {} "  ,member.getMemberSn() , friendSn);


        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, friendSn);
    }
}
