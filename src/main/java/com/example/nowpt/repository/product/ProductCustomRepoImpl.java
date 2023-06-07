package com.example.nowpt.repository.product;

import com.example.nowpt.mvc.model.Product;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ProductCustomRepoImpl implements ProductCustomRepo {

    private final JPAQueryFactory qf;






}
