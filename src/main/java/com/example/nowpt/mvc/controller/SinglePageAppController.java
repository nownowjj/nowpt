package com.example.nowpt.mvc.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
public class SinglePageAppController {
    @RequestMapping(value = {"/", "/api/**"})
    public String index() {
        log.debug("SinglePageAppController ~~");
        return "index.html";
    }
}