package com.example.nowpt.repository.cmmn_code_detail;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CmmnCodeDetailCustomRepoImpl implements CmmnCodeDetailCustomRepo{
	@Autowired private JPAQueryFactory qf;
}
