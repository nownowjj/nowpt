package com.example.nowpt.mvc.repository.schedule;

import com.example.nowpt.mvc.dto.ScheduleDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.QSchedule;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.apache.logging.log4j.util.Strings.concat;

@Repository
@Slf4j
@RequiredArgsConstructor
public class ScheduleCustomRepoImpl implements ScheduleCustomRepo {
	private final JPAQueryFactory queryFactory;
	QSchedule qSchedule = QSchedule.schedule;

	@Override
	public List<ScheduleDto> selectSchedule(String date, long memberSn) {
		return queryFactory
				.select(Projections.fields(ScheduleDto.class,
						qSchedule.scheduleSn,
						qSchedule.color,
						qSchedule.startDate,
						qSchedule.endDate,
						qSchedule.title,
						qSchedule.frstRegistDt,
						qSchedule.lastChangeDt,
						qSchedule.memberSn
						))
				.from(qSchedule)
				.where(
					qSchedule.memberSn.eq(memberSn)
							.and(qSchedule.useYn.eq("Y"))
							.andAnyOf(
									qSchedule.startDate.between(
											concat(date,"01"),
											concat(date,"31")
									),
									qSchedule.endDate.between(
											concat(date,"01"),
											concat(date,"31")
									)
							)
				)
				.fetch();
	}
//
//	@Override
//	public Room findByRoomSn(Long roomSn) {
//		QRoom qRoom = QRoom.room;
//		return qf.selectFrom(qRoom).where(qRoom.roomSn.eq(roomSn)).fetchOne();
//	}
}
