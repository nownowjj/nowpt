package com.example.nowpt.mvc.restcontoller.common;


import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.repository.member.MemberRepo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * ADMIN과 USER 등 모든 권한이 사용 가능한 api
 *
 */
@Slf4j
@RequestMapping("/api/common")
@RestController
@RequiredArgsConstructor
public class CommonRestController {

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
}
