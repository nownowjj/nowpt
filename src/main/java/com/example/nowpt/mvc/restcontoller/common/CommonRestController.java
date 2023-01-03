package com.example.nowpt.mvc.restcontoller.common;


import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.repository.member.MemberRepo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * ADMIN과 USER 등 모든 권한이 사용 가능한 api
 *
 */
@Slf4j
@RequestMapping("/api/common")
@RestController
public class CommonRestController {

    @Autowired private MemberRepo memRepo;

    @GetMapping("/getMembInfo")
    public Member getMembInfo(@AuthenticationPrincipal Member member){
        return member;
    }

    @PutMapping("/updateEmail/{email}")
    public String myPage( @AuthenticationPrincipal Member member,@PathVariable("email") String email){
        // 해당 Sn 가져옴
        Long membSn = member.getMemberSn();
        log.debug("paramEmail : {}" , email);
        // Sn으로 유저 정보 가져옴
        Member mem = memRepo.findByMemberSn(membSn);
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
}
