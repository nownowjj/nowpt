package com.example.nowpt.repository;

import com.example.nowpt.model.Member;
import com.example.nowpt.model.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TestCustomRepositoryImpl implements TestCustomRepository {

    @Autowired private JPAQueryFactory queryFactory;

    @Override
    public List<Member> selectAllTest(){
        QMember qMember = QMember.member;
        return queryFactory.selectFrom(qMember).fetch();
    }
}
