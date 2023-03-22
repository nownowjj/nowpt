package com.example.nowpt.repository.room;

import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.mvc.model.Room;
import com.example.nowpt.repository.member_money.MemberMoneyCustomRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepo extends JpaRepository<Room, Long>, RoomCustomRepo {

    int countByFrstRegistMembSn(Long memberSn);
}
