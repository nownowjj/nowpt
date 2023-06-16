package com.example.nowpt.mvc.repository.room;

import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.mvc.model.Room;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomCustomRepo {
	Room findByRoomSn(Long roomSn);
}
