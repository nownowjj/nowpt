package com.example.nowpt.mvc.restcontoller.admin;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.LoginHstDto;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.mvc.service.MapperService;
import com.example.nowpt.mvc.service.TestService;
import com.example.nowpt.mvc.service.admin.LoginHstService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class ApiController {
    private final TestService testService;
    private final MapperService mapperService;
    private final LoginHstService loginHstService;

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
    public ResponseDto<?> selectLoginStatistics(
            Pageable pageable
    ){
        log.debug("좋아요 리스트 진입 성공");
        log.debug("page@@ : {}",pageable);


        Page<LoginHstDto> result = loginHstService.selectLoginStatistics(pageable);
        if (!result.isEmpty())return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, result);
        else return ResponseUtil.FAILURE(Cd.SELECT_FAIL, null);
    }


}
