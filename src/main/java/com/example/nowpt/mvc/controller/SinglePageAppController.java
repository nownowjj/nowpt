package com.example.nowpt.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SinglePageAppController {
    @RequestMapping(value = {"/", "/api/**"})
    public String index() {
        return "index.html";
    }
}