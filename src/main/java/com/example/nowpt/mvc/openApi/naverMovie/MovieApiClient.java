package com.example.nowpt.mvc.openApi.naverMovie;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Slf4j
@Service
public class MovieApiClient {
    private final RestTemplate restTemplate;

    @Value("${naverLogin.clientId}") private  String CLIENT_ID;
    @Value("${naverLogin.clientSecret}") private String CLIENT_SECRET;

    private final String OpenNaverMovieUrl_getMovies = "https://openapi.naver.com/v1/search/movie.json?query={keyword}&display=100";

    public MoviesResponseDto requestMovie(String keyword) {
        final HttpHeaders headers = new HttpHeaders(); // 헤더에 key들을 담아준다.
        headers.set("X-Naver-Client-Id", CLIENT_ID);
        headers.set("X-Naver-Client-Secret", CLIENT_SECRET);

        final HttpEntity<String> entity = new HttpEntity<>(headers);

        log.debug("result : {}", restTemplate.exchange(OpenNaverMovieUrl_getMovies,HttpMethod.GET,entity,MoviesResponseDto.class,keyword).getBody());
        return restTemplate.exchange(OpenNaverMovieUrl_getMovies, HttpMethod.GET, entity, MoviesResponseDto.class, keyword).getBody();
    }
}