package com.example.nowpt.mvc.openApi.naverMovie;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MoviesApiController {
    private final MoviesService moviesService;

    @GetMapping("/api/auth/movies/{keyword}")
    public MoviesResponseDto get(@PathVariable String keyword){
        return moviesService.findByKeyword(keyword);
    }
}