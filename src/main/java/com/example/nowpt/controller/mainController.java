package com.example.nowpt.controller;

import com.example.nowpt.model.Member;
import com.example.nowpt.model.QMember;
import com.example.nowpt.model.Test2;
import com.example.nowpt.service.TestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class mainController {

    @Autowired private TestService testService;

    @RequestMapping({"/main","/"})
    public String main(){

        log.debug("jwCheck{}",testService.selectAllTest());

        List<Member> lists = testService.selectAllTest();

        for(Member data: lists){
            System.out.println(data);
        }
        return lists.toString();
    }


}
