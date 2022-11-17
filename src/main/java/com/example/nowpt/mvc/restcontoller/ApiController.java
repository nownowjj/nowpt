package com.example.nowpt.mvc.restcontoller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@Slf4j
public class ApiController {

    @GetMapping("/api")
    public HashMap api(){
        HashMap result = new HashMap();
        result.put("message","안녕하세요");

        log.debug("restCheck : {}" ,result);

        return result;
    }
}
