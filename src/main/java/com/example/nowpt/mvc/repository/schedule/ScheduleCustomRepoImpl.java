package com.example.nowpt.mvc.repository.schedule;

import com.example.nowpt.mvc.model.QRoom;
import com.example.nowpt.mvc.model.Room;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScheduleCustomRepoImpl implements ScheduleCustomRepo {
	@Autowired private JPAQueryFactory qf;
//
//	@Override
//	public Room findByRoomSn(Long roomSn) {
//		QRoom qRoom = QRoom.room;
//		return qf.selectFrom(qRoom).where(qRoom.roomSn.eq(roomSn)).fetchOne();
//	}
}
