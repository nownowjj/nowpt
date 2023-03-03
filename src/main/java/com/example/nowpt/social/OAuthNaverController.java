package com.example.nowpt.social;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.utils.EntityUtil;
import com.example.nowpt.mvc.dto.JwtAuthenticationResponse;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.repository.member.MemberRepo;
import com.example.nowpt.service.AuthService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OAuthNaverController {
    @Autowired
    private OAuthNaverService oAuthNaverService;
    @Autowired
    private MemberRepo memRepo;
    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder pe;

    @Autowired
    private EntityUtil eu;

    private final static String sns = "Y";

    public static <K, V> K getKey(Map<K, V> map, V value)
    {
        for (Map.Entry<K, V> entry: map.entrySet())
        {
            if (value.equals(entry.getValue())) {
                return entry.getKey();
            }
        }
        return null;
    }


    @GetMapping("/naver")
   public HashMap naverCallback(HttpServletRequest request , @RequestParam String code, @RequestParam String state ) throws JsonProcessingException {
        HashMap result = new HashMap();
        // 로그인 성공하고 params으로 전달받은 naver code
        log.debug("naverCode : {}", code);

        // 로그인 성공 후 code를 인자로 던져서
        String access_token = oAuthNaverService.getAccessToken(code,state);
        log.debug("access_token : {}", access_token);

        JsonNode naverUserInfo = oAuthNaverService.getNaverUserInfo(access_token);
        log.debug("반환 request :{}",naverUserInfo);

        String message = naverUserInfo.get("message").asText();
        String id = naverUserInfo.get("response").get("id").asText();
        String nickname = naverUserInfo.get("response").get("nickname").asText();
        String name = naverUserInfo.get("response").get("name").asText();
        String profile_image = naverUserInfo.get("response").get("profile_image").asText();
        String email = naverUserInfo.get("response").get("email").asText();
        String originMobile = naverUserInfo.get("response").get("mobile").asText();
        String mobile = originMobile.replace("-","");


        log.debug("email Ck : {}" , email);
        // 로그인 response message가  success가 아니면 로그인 요청 실패임.
        if(! (message.equals("success") )) {
            result.put("error",false);
            return result;
        }else {
            //가입 유무 판별 후 로그인 진행
            Member mem = memRepo.memberChkByEmail(email);
            log.debug("해당 이메일로 가입 여부 : {}", mem);

            // 가입 이력 있음
            if (mem != null) {

                // 가입된 유저니 로그인을 시켜줌.(jwt 발급 후 return)
                log.debug("이미 가입한 유저 : {}", mem);

                // 프로필 이미지 갱신
                String origin_image = mem.getProfileImage();
                if(!(origin_image.equals(profile_image))){
                    log.debug("가입된 유저의 프로필이 변경 되었습니다. 새로운 이미지로 변경 합니다.");
                    mem.setProfileImage(profile_image);
                    memRepo.save(mem);
                }

                // 이미 가입된 유저라 바로 로그인(토큰 발급) 시키면 됨.
                String token = authService.gettoken(mem.getMembId(),mem.getMembPw(),request.getRemoteAddr(),sns);
                log.debug("token!! : {}" , (new JwtAuthenticationResponse(token)).getAccessToken());
                result.put("token",(new JwtAuthenticationResponse(token)));

            }else{
                // 미가입 유저 이므로 가입 시킨 후 , 토큰 발급
                log.debug("가입 시켜야 할 유저 : {}", mem);

                // 네이버 정보로 유저 가입
                MemberMoney newMem = new MemberMoney();
                newMem.setMoneyBlce(0L);
                newMem.setMembPw(pe.encode(id)) ;
                newMem.setMembCls(eu.getMemberTyCmm(Cd.MEMBER_TY_USER));
                newMem.setEmailAddr(email);
                newMem.setMembSttusCd(eu.getMemberSttusCmm(Cd.MEMBER_STTUS_OK));
                newMem.setProfileImage(profile_image);
                newMem.setMembId(id);
                newMem.setMembNm(name);
                newMem.setMobileNo(mobile);
                newMem.setSubscriptionMethod("NAVER");
                log.debug("newMem : {} " , newMem);
                memRepo.save(newMem);

                // 가입 완료 되었으면 jwt 발급 후 로그인 진행
                log.debug("회원가입 완료 되었고 JWT 토큰 발급 진행후 리턴");
                String token = authService.gettoken(newMem.getMembId(),newMem.getMembPw(),request.getRemoteAddr(),sns);
                log.debug("token!! : {}" , (new JwtAuthenticationResponse(token)).getAccessToken());
                result.put("token",(new JwtAuthenticationResponse(token)));
            }

            return result;
        }
    }

}
