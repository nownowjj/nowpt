package com.example.nowpt.mvc.naverMovie;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MoviesService {
    private final MovieApiClient movieApiClient;

    @Transactional(readOnly = true)
    public MoviesResponseDto findByKeyword(String keyword) {
        return movieApiClient.requestMovie(keyword);
    }
}