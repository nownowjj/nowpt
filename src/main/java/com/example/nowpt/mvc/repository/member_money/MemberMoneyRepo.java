package com.example.nowpt.mvc.repository.member_money;

import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.MemberMoney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberMoneyRepo extends JpaRepository<MemberMoney, Member>, MemberMoneyCustomRepo{

}
