package com.example.nowpt.mvc.repository;

import com.example.nowpt.mvc.model.Member;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestCustomRepository {
    List<Member> selectAllTest();
}
