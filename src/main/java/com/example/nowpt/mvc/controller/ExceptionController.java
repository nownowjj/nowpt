package com.example.nowpt.mvc.controller;

import java.util.Map;
import java.util.Objects;

import javax.servlet.RequestDispatcher;
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
    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

        if(status != null) {
            int statusCode = Integer.valueOf(status.toString());

            if (statusCode == HttpStatus.FORBIDDEN.value()) {
                return "errorpages/error-403";
            } else if (statusCode == HttpStatus.NOT_FOUND.value()) {
                log.debug("404 NOT FOUND : {}",Integer.valueOf(status.toString()));
                return "index.html";
            } else if (statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                return "errorpages/error-500";
            }
        }
        return "errorpages/error";
    }
}