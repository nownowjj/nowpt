package com.example.nowpt.mvc.restcontoller.common;


import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.common.RestControllerBase;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.repository.member.MemberRepo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;

/**
 * ADMIN과 USER 등 모든 권한이 사용 가능한 api
 *
 */
@Slf4j
@RequestMapping("/api/common")
@RestController
@RequiredArgsConstructor
public class CommonRestController extends RestControllerBase {

     private final MemberRepo memRepo;

    @GetMapping("/getMembInfo")
    public Member getMembInfo(@AuthenticationPrincipal Member member){
        return member;
    }

    @PutMapping("/updateEmail/{email}")
    public String myPage(@AuthenticationPrincipal Member member,@PathVariable("email") String email){
        Member mem = memRepo.findByMemberSn(member.getMemberSn());
        if(mem != null){
            log.debug("mem : {}", mem);
            mem.setEmailAddr(email);
            memRepo.save(mem);
        }

        Gson gson = new Gson();

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("data",email);

        log.debug("jsonObject {}" ,jsonObject);
        return gson.toJson(jsonObject);
    }

    @PutMapping("/profile")
    public ResponseDto<?> updateUserProfileImg(@RequestBody Map<String, String> request){
        Member updateMember = memRepo.findByMemberSn(getMemberSn());
        updateMember.setProfileImage(request.get("profileImg"));
        updateMember.setLastChangeDt(LocalDateTime.now());
        memRepo.save(updateMember);

        return ResponseUtil.SUCCESS(Cd.PUT_SUCCESS, true);
    }

    @GetMapping("/profile")
    public ResponseDto<?> getUserProfileImg(){
        return ResponseUtil.SUCCESS(Cd.PUT_SUCCESS, getMember().getProfileImage());
    }
}
