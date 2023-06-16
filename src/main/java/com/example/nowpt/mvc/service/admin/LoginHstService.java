package com.example.nowpt.mvc.service.admin;

import com.example.nowpt.mvc.dto.LoginHstDto;
import com.example.nowpt.mvc.repository.member_login_hst.MemberLoginHstRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginHstService {
    private final MemberLoginHstRepo memberLoginHstRepo;
    // 로그인 이력 집계 조회
    public List<LoginHstDto> selectLoginStatistics(){
        return memberLoginHstRepo.selectLoginStatistics();
    }

}
