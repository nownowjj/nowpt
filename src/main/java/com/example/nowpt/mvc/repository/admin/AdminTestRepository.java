package com.example.nowpt.mvc.repository.admin;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AdminTestRepository {
    private final JPAQueryFactory queryFactory;

    

}
