package com.example.nowpt.controller;

import com.example.nowpt.model.Member;
import com.example.nowpt.service.TestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@Slf4j
public class mainController {

    @Autowired private TestService testService;

    @RequestMapping({"/main","/"})
    public String main(Model model){


        List<Member> lists = testService.selectAllTest();
        log.debug("jwCheck{}",testService.selectAllTest());

        model.addAttribute("lists",lists);

        return "mvc/main";
    }


}
