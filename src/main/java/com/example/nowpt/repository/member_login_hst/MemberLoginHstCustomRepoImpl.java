package com.example.nowpt.repository.member_login_hst;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemberLoginHstCustomRepoImpl implements MemberLoginHstCustomRepo{
	@Autowired private JPAQueryFactory qf;
}
