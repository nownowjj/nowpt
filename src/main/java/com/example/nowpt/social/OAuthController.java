package com.example.nowpt.social;

import com.google.gson.JsonElement;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@AllArgsConstructor
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {

    @Autowired
    private OAuthService oAuthService;
    /**
     * 카카오 callback
     * [GET] /oauth/kakao/callback
     */
    @ResponseBody
    @GetMapping("/kakao")
    public HashMap kakaoCallback(HttpServletRequest request, @RequestParam String code) {
//        log.debug("request는 : {}" ,request);
        // 로그인 성공하고 params으로 전달받은 code
        log.debug("kakaoCode : {}", code);

        // 로그인 성공 후 code를 인자로 던져서
        String access_token = oAuthService.getKakaoAccessToken(code);
        log.debug("access_token : {}",access_token);

//        log.debug("check@ : {} ",oAuthService.createKakaoUser(access_token));

        HashMap result = new HashMap();
        result.put("datas",oAuthService.createKakaoUser(access_token));
        log.debug("결과 : {}" , result);




        JsonElement element = oAuthService.createKakaoUser(access_token);

        boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
        // kakao response에 email이 true
        String email = "";
        int id = 0;
        String nickname = "";
        String profile_image = "";
        if(hasEmail){
            email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            id = element.getAsJsonObject().get("id").getAsInt();
            nickname = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
            profile_image = element.getAsJsonObject().get("properties").getAsJsonObject().get("profile_image").getAsString();
        }
        log.debug("email : {} , id : {} , nickname : {} , profile_image : {}",email,id,nickname,profile_image);


        return result;
    }
}