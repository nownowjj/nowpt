//package com.example.nowpt.mvc.controller;
//
//import com.example.nowpt.mvc.dto.MemberDto;
//import com.example.nowpt.mvc.dto.Result;
//import com.example.nowpt.mvc.model.Member;
//import com.example.nowpt.service.TestService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Controller
//@Slf4j
//public class mainController {
//
//    @Autowired private TestService testService;
//    @RequestMapping("/main")
//    public String main(Model model){
//
//
//        List<Member> lists = testService.selectAllTest();
//
//        List<MemberDto> collect = lists.stream()
//                        .map(m -> new MemberDto(m.getMembNm(),m.getMembId() ))
//                                .collect(Collectors.toList());
//        log.debug("listResult! : {}",new Result(collect.size(),collect));
//
//
//        Date now = new Date();
//        //원하는 데이터 포맷 지정
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy년 MM월 dd일 hh시 mm분");
//        //지정한 포맷으로 변환
//        String strNowDate = simpleDateFormat.format(now);
//
//        model.addAttribute("now",now);
//        model.addAttribute("strNowDate",strNowDate);
//
//
//        model.addAttribute("lists",new Result(collect.size(),collect));
//
//        return "mvc/main";
//    }
//
//
//}
