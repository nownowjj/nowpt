package com.example.nowpt.mvc.restcontoller.admin;

import com.example.nowpt.cmm.code.ApiCd;
import com.example.nowpt.cmm.rvo.RVO;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.mvc.service.MapperService;
import com.example.nowpt.mvc.service.TestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        result.put("test",member.getMembNm());
        result.put("test2",member.getAuthorities());
        result.put("test3",testService.selectAllLoginHst());
        return result;
    }

    @GetMapping("/batis")
    @SuppressWarnings("unchecked")
    public HashMap batis(){
//        log.debug("batis : {}",mapperService.selectAllMember());
        HashMap result = new HashMap();
        result.put("selectAll",mapperService.selectAllMember());
        return result;
    }

    @GetMapping("/loginhst2")
    public RVO<List<Map<String,String>>> selectLoginStatistics(){
        return RVO.<List<Map<String,String>>>builder()
                .msg("로그인 통계")
                .code(ApiCd.NORMAL)
                .data(mapperService.selectLoginStatistics())
                .build();
    }


}
