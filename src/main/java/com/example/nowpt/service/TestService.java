package com.example.nowpt.service;

import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.MemberLoginHst;
import com.example.nowpt.repository.TestRepository;
import com.example.nowpt.repository.member_login_hst.MemberLoginHstRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TestService {
    @Autowired
    TestRepository testRepository;

    @Autowired
    MemberLoginHstRepo memberLoginHstRepo;
    public List<Member> selectAllTest(){
        return testRepository.selectAllTest();
    }

    public List<MemberLoginHst> selectAllLoginHst(){
        return memberLoginHstRepo.selectAllLoginHst();
    }
}
