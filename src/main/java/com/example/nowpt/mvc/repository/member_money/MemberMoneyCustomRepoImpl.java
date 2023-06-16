package com.example.nowpt.mvc.repository.member_money;

import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.mvc.model.QMemberMoney;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemberMoneyCustomRepoImpl implements MemberMoneyCustomRepo{
	@Autowired private JPAQueryFactory qf;
//
	@Override
	public MemberMoney memberMoneyChkByMemberSn(Long memberSn) {
		QMemberMoney qmm = QMemberMoney.memberMoney;
		return qf.selectFrom(qmm).where(qmm.memberSn.eq(memberSn)).fetchOne();
	}
}
