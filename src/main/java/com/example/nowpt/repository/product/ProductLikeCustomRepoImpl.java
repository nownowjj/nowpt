package com.example.nowpt.repository.product;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ProductLikeCustomRepoImpl implements ProductLikeCustomRepo {

    private final JPAQueryFactory qf;






}
