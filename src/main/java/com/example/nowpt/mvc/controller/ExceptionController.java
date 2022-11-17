package com.example.nowpt.mvc.controller;

import java.util.Map;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 오류 발생시에 대한 컨트롤러 입니다.
 * **/
@Controller
@Slf4j
public class ExceptionController implements ErrorController   {
    /**
     * 오류를 처리합니다.
     * **/
    @RequestMapping(value = "/error")
    public ResponseEntity<Object> handleNoHandlerFoundException(HttpServletResponse response, HttpServletRequest request) {
        int status = response.getStatus();

        System.out.println(status);  //오류 상태
        System.out.println(request.getRequestURI());  //요청 주소
        log.debug("ExceptionCheck : {} {} " , status, request.getRequestURI());

        //아래 코드는 샘플 응답코드입니다. 오류에 따라 원하는 방식으로 리턴하면 되겠습니다.
        if (Objects.equals(request.getContentType(), MediaType.APPLICATION_JSON_VALUE)) {
            Map<String, Object> body = Map.of("error", "Not Found", "timestamp", System.currentTimeMillis());
            return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
    }
}