package com.example.nowpt.mvc.restcontoller;

import com.example.nowpt.mvc.model.MbrPrinciple;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.mvc.service.MapperService;
import com.example.nowpt.service.TestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class ApiController {

    @Autowired private TestService testService;

    @Autowired private MapperService mapperService;

//    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
//    @Secured("ROLE_ADMIN")
    @GetMapping("/jpa")
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

    @GetMapping("/batis")
    @SuppressWarnings("unchecked")
    public HashMap batis(){
        log.debug("batis : {}",mapperService.selectAllMember());
        HashMap result = new HashMap();
        result.put("selectAll",mapperService.selectAllMember());
        return result;
    }

}
