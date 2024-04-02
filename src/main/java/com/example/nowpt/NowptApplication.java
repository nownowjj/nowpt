package com.example.nowpt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.web.config.PageableHandlerMethodArgumentResolverCustomizer;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAspectJAutoProxy //해당 애노테이션을 기재해야 Spring의 AOP를 사용할 수 있다. 최상위 패키지 클래스(~Application.java)에 해당 애노테이션을 적용함으로써 AOP를 찾을 수 있게 도와준다.
@SpringBootApplication
@EnableScheduling // Scheduling추가 23.02.20
public class NowptApplication extends ApplicationBase{

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(NowptApplication.class, args);

        dumpApplicationStartup(ctx);
    }
//    @Bean
//    public PageableHandlerMethodArgumentResolverCustomizer customize() {
//        return p -> {
//            p.setOneIndexedParameters(true);	// 1부터 시작
//            p.setMaxPageSize(10);				// size=10
//        };
//    }


}
