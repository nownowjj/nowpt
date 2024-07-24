package com.example.nowpt.mvc.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
public class SinglePageAppController {

    @Value("${spring.profiles.active}") private  String profiles;

//    @RequestMapping(value = {"/", "/api/**"})
//    public String index() {
//
//        log.debug("SinglePageAppController 개발 환경 : {}",profiles);
//        return "index.html";
//    }

    @RequestMapping(value = { "/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}" })
    public String forward() {
        log.debug("SPA forward index.html !! profiles : {}",profiles);
        return "forward:/index.html";
    }
}