package com.example.nowpt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.web.config.PageableHandlerMethodArgumentResolverCustomizer;

@SpringBootApplication
public class NowptApplication {

    public static void main(String[] args) {
        SpringApplication.run(NowptApplication.class, args);
    }
//    @Bean
//    public PageableHandlerMethodArgumentResolverCustomizer customize() {
//        return p -> {
//            p.setOneIndexedParameters(true);	// 1부터 시작
//            p.setMaxPageSize(10);				// size=10
//        };
//    }


}
