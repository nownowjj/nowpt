package com.example.nowpt.mvc.service;

import com.example.nowpt.mvc.model.MemberLoginHst;
import com.example.nowpt.mvc.repository.member_login_hst.MemberLoginHstRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TestService {
    private final MemberLoginHstRepo memberLoginHstRepo;

    public List<MemberLoginHst> selectAllLoginHst(){
        return memberLoginHstRepo.selectAllLoginHst();
    }
}
