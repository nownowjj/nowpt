package com.example.nowpt.mvc.admin;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.service.admin.AdminTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminTestRestController {
    private final AdminTestService adminTestService;
//    @GetMapping("/user")
//    public ResponseDto<?> select(Pageable pageable){
//        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, adminTestService.getMembers(pageable));
//    }
}
