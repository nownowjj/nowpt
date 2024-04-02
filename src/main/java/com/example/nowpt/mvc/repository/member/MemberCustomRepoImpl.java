package com.example.nowpt.mvc.repository.member;

import com.example.nowpt.mvc.dto.MemberDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.QMember;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class MemberCustomRepoImpl implements MemberCustomRepo{
	private final JPAQueryFactory qf;
	QMember member = QMember.member;


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

	@Override
	public List<MemberDto> selectAllMember() {
		return qf
				.select(Projections.fields(MemberDto.class,
						member.memberSn.as("membSn"),
						member.membNm.as("membNm"),
						member.membId.as("membId"),
						member.useYn.as("useYn"),
						member.emailAddr.as("emailAddr")
				))
				.from(member)
				.orderBy(member.frstRegistDt.desc())
				.fetch();
	}
}
