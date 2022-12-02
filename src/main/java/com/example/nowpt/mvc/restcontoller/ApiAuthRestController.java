package com.example.nowpt.mvc.restcontoller;

import com.example.nowpt.cmm.code.ApiCd;
import com.example.nowpt.cmm.rvo.RVO;
import com.example.nowpt.mvc.dto.JoinDto;
import com.example.nowpt.mvc.dto.JwtAuthenticationResponse;
import com.example.nowpt.mvc.dto.LoginDto;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@Slf4j
@RequestMapping("/api/auth")
public class ApiAuthRestController {

    @Autowired
    private AuthService authService;


    @GetMapping("/home")
    public HashMap home(){
        HashMap result = new HashMap();
        result.put("message","home입니다");

        log.debug("restCheck : {}" ,result);

        return result;
    }
    @GetMapping("/main")
    public HashMap api(){
        HashMap result = new HashMap();
        result.put("message","안녕하세요");

        log.debug("restCheck : {}" ,result);

        return result;
    }
    @PostMapping("/userLogin")
    public ResponseEntity<?> userLogin(HttpServletRequest request, @RequestBody LoginDto loginDto){
        log.debug("[getRemoteAddr]{}",request.getRemoteAddr());
        String token = authService.gettoken(loginDto.getMembId(), loginDto.getMembPw(), request.getRemoteAddr());
//        log.debug("token Check!! : {} " ,token);
//        log.info(ResponseEntity.ok(new JwtAuthenticationResponse(token).getAccessToken()) + " AccessToken check");
//        log.info(ResponseEntity.ok(new JwtAuthenticationResponse(token).getTokenType()) + " Type check");
//        log.info(ResponseEntity.ok(new JwtAuthenticationResponse(token).getRole()) + " Role check");
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }


    @PostMapping("/userJoin")
    public RVO<MemberMoney> userJoin(@RequestBody JoinDto joinDto){
        return RVO.<MemberMoney>builder()
                .msg("사용자 가입 되었습니다.")
                .code(ApiCd.NORMAL)
                .data(authService.userJoin(joinDto))
                .build();
    }
}
