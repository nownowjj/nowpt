package com.example.nowpt.repository.member;

import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
public class MemberCustomRepoImpl implements MemberCustomRepo{
	@Autowired private JPAQueryFactory qf;

	@Override
	public Member memberChkById(String id) {
		log.debug("레파지토리 !");
		QMember qmem = QMember.member;
		return qf.selectFrom(qmem).where(qmem.membId.eq(id).and(qmem.useYn.eq("Y"))).fetchOne();
	}

	@Override
	public Member memberChkByEmail(String email) {
		log.debug("이메일 존재 여부 확인");
		QMember qMember = QMember.member;
		return qf.
				selectFrom(qMember)
				.where(qMember.emailAddr.eq(email).and(qMember.useYn.eq("Y"))).fetchOne();
	}
}
