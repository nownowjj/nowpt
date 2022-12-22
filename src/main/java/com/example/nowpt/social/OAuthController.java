package com.example.nowpt.social;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public void kakaoCallback(@RequestParam String code) {
        log.debug("kakaoCode : {}", code);

        String access_token = oAuthService.getKakaoAccessToken(code);
        log.debug("access_token : {}",access_token);

        oAuthService.createKakaoUser(access_token);
    }
}