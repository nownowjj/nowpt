package com.example.nowpt.mvc.repository.member_money;

import com.example.nowpt.mvc.model.MemberMoney;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberMoneyCustomRepo {
	MemberMoney memberMoneyChkByMemberSn(Long memberSn);
}
