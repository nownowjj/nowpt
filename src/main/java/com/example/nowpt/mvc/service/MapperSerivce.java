package com.example.nowpt.mvc.service;

import com.example.nowpt.mvc.mapper.MemberMapper;
import com.example.nowpt.mvc.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MapperSerivce {

    private MemberMapper memberMapper;

    public List<Member> selectAllMember() {
        List<Member> members = memberMapper.selectAllMember();
        return members;
    }

}
