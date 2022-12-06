package com.example.nowpt.mvc.restcontoller;

import com.example.nowpt.mvc.model.MbrPrinciple;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.service.TestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@Slf4j
@RequestMapping("/api")
public class ApiController {

    @Autowired private TestService testService;


//    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
//    @Secured("ROLE_ADMIN")
    @GetMapping("/test")
    public HashMap api2(@AuthenticationPrincipal MemberMoney member){


        HashMap result = new HashMap();
        // 권한

        log.debug("======test========");
        result.put("test",member.getMembNm());

        log.debug("======test2========");
        result.put("test2",member.getAuthorities());

        result.put("test3",testService.selectAllLoginHst());

        log.debug("restCheck2 : {}" ,result);

        return result;
    }
}
