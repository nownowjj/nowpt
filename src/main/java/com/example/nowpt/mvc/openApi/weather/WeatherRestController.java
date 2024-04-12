package com.example.nowpt.mvc.openApi.weather;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.model.Member;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.RestTemplate;

@RestControllerAdvice
@RequestMapping("/api/auth/weather")
public class WeatherRestController {

    private final String apiKey = "ed2c360f57bf8b6d2532dbf8702ecf49";

    @GetMapping
    public ResponseDto<?> getMemo(@RequestParam("lat") String lat, @RequestParam("lon") String lon){

        String url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, response.getBody());
    }

}
