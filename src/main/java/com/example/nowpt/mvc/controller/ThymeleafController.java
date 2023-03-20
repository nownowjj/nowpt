package com.example.nowpt.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/thymeleaf")
public class ThymeleafController {

    @RequestMapping(path= {"", "/"})
    public String thymeleafMain(Model model){
        model.addAttribute("hello","hello");
        return "mvc/main";
    }

}
