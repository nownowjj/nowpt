package com.example.nowpt.mvc.repository.memo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
@RequiredArgsConstructor
public class MemoCustomRepoImpl implements MemoCustomRepo {

    private final JPAQueryFactory queryFactory;



}
