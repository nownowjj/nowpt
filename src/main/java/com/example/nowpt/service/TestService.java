package com.example.nowpt.service;

import com.example.nowpt.model.Member;
import com.example.nowpt.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TestService {

    @Autowired
    TestRepository testRepository;

    public List<Member> selectAllTest(){
        return testRepository.selectAllTest();
    }
}
