package com.example.nowpt.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class mainController {

    @RequestMapping("/main")
    public String main(){

        String str = "success heroku github !!";

        return str;
    }
}
