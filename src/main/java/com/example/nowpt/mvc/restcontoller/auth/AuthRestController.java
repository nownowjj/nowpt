package com.example.nowpt.mvc.restcontoller.auth;

import com.example.nowpt.cmm.code.ApiCd;
import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.RVO;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseStatus;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.*;
import com.example.nowpt.mvc.mapper.MemberMapper;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.mvc.repository.member.MemberRepo;
import com.example.nowpt.mvc.service.MailService;
import com.example.nowpt.mvc.service.MapperService;
import com.example.nowpt.mvc.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 로그인, 회원가입 등과 같이 권한이 없어도 사용할 수 있는 api
 *
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthRestController {

    private final AuthService authService;
    private final MailService mailService;
    private final MapperService mapperService;
    private final MemberMapper memberMapper;
    private final MemberRepo memberRepo;

    String  sns = "N";

    @GetMapping("/home")
    public ResponseDto<?> home() {
        HashMap<String, String> result = new HashMap<>();
        result.put("message","home입니다");

        try {
            Thread.sleep(1500);
            if(result != null) throw new RuntimeException("예외를 강제로 발생시켰습니다.");
        } catch (Exception e)    {
            System.out.println("에러 메시지 : " + e.getMessage());
            return ResponseUtil.ERROR(Cd.SELECT_FAIL,null);
        }
        log.debug("home api 체크");

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS,result);
    }
    @GetMapping("/main")
    public HashMap<String, String> api(){
        HashMap<String, String> result = new HashMap<String, String>();
        result.put("message","안녕하세요");
        log.debug("restCheck : {}" ,result);

        return result;
    }


    @PostMapping("/userLogin")
    public ResponseDto<?> userLogin(HttpServletRequest request, @RequestBody LoginDto loginDto){
        log.debug("[getRemoteAddr]{}",request.getRemoteAddr());
        Map<String,String> errMap = new HashMap<>();
        String token = authService.gettoken(loginDto.getMembId(), loginDto.getMembPw(), request.getRemoteAddr(),sns);
        if(token.equals("fail")){
            errMap.put("errorMessage","notF");
            return ResponseUtil.FAILURE(Cd.LOGIN_FAIL, errMap);
        }
        if(token.equals("peNot")){
            errMap.put("errorMessage","notP");
            return ResponseUtil.FAILURE(Cd.LOGIN_FAIL, errMap);
        }
        return ResponseUtil.SUCCESS(Cd.LOGIN_SUCCESS, new JwtAuthenticationResponse(token));
    }


    @PostMapping("/userJoin")
    public RVO<MemberMoney> userJoin(@RequestBody JoinDto joinDto){
        log.debug("joinDto : {}" , joinDto);
        return RVO.<MemberMoney>builder()
                .msg("사용자 가입 되었습니다.")
                .code(ApiCd.NORMAL)
                .data(authService.userJoin(joinDto))
                .build();
    }

    @PostMapping("/sendEmail")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        mailService.sendEmail(emailRequest);
    }





}
