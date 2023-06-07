package com.example.nowpt.social;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.utils.EntityUtil;
import com.example.nowpt.mvc.dto.JwtAuthenticationResponse;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.repository.member.MemberRepo;
import com.example.nowpt.mvc.service.AuthService;
import com.google.gson.JsonElement;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {
    private final OAuthService oAuthService;
    private final MemberRepo memRepo;
    private final AuthService authService;
    private final PasswordEncoder pe;
    private final EntityUtil eu;
    private final static String sns = "Y";



    /**
     * 카카오 callback
     * [GET] /oauth/kakao/callback
     */
    @ResponseBody
    @GetMapping("/kakao")
    public HashMap kakaoCallback(HttpServletRequest request, @RequestParam String code) {
        log.debug("request ip는 : {}", request.getRemoteAddr());
        // 로그인 성공하고 params으로 전달받은 code
        log.debug("kakaoCode : {}", code);

        // 로그인 성공 후 code를 인자로 던져서
        String access_token = oAuthService.getKakaoAccessToken(code);
        log.debug("access_token : {}", access_token);

//        log.debug("check@ : {} ",oAuthService.createKakaoUser(access_token));

        HashMap result = new HashMap();

        // 카카오에서 준 데이터를 바로 사용하지 않고 DB 정보를 사용한다.

        // 카카오 access_token으로 요청하여
        JsonElement element = oAuthService.createKakaoUser(access_token);

        // kakao에서 준 데이터에서 email이 있는지 여부
        boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
        // kakao response에 email이 true
        String email = "";
        int id = 0;
        String nickname = "";
        String profile_image = "";
        if (hasEmail) {
            email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            id = element.getAsJsonObject().get("id").getAsInt();
            nickname = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
            profile_image = element.getAsJsonObject().get("properties").getAsJsonObject().get("profile_image").getAsString();
        }
        log.debug("email : {} , id : {} , nickname : {} , profile_image : {}", email, id, nickname, profile_image);

        // 카카오에서 준 id는 int 타입이므로 toString
        String social_id = Integer.toString(id);

        // 카카오 email이 DB에 존재하는지 확인
        Member mem = memRepo.memberChkByEmail(email);

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

        } else {
            // 미가입 유저 이므로 가입 시킨 후 , 토큰 발급
            log.debug("가입 시켜야 할 유저 : {}", mem);

            // 카카오 정보로 유저 가입
            MemberMoney newMem = new MemberMoney();
            newMem.setMoneyBlce(0L);
            newMem.setMembPw(pe.encode(social_id)) ;
            newMem.setMembCls(eu.getMemberTyCmm(Cd.MEMBER_TY_USER));
            newMem.setEmailAddr(email);
            newMem.setMembSttusCd(eu.getMemberSttusCmm(Cd.MEMBER_STTUS_OK));
            newMem.setProfileImage(profile_image);
            newMem.setMembId(social_id);
            newMem.setMembNm(nickname);
            newMem.setSubscriptionMethod("KAKAO");
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