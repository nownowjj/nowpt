package com.example.nowpt.mvc.repository.calendar;

import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.model.QCalendar;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class CalendarCustomRepoImpl implements CalendarCustomRepo {

    private final JPAQueryFactory queryFactory;
    QCalendar qCalendar = QCalendar.calendar;

    @Override
    public List<String> selectRecordDate(CalenderDto calenderDto) {
        return queryFactory
                .select(qCalendar.recordDate)
                .from(qCalendar)
                .where(
                        qCalendar.memberSn.eq(calenderDto.getMemberSn()).and(qCalendar.useYn.eq("Y").and(qCalendar.recordDate.like(calenderDto.getRecordDate()+'%')))
                )
                .fetch();

    }

    @Override
    public List<CalenderDto> selectDetailRecord(CalenderDto calenderDto) {
        return queryFactory
                .select(Projections.fields(CalenderDto.class,
                        qCalendar.calendarSn.as("calendarSn"),
                        qCalendar.memberSn.as("memberSn"),
                        qCalendar.recordDate.as("recordDate"),
                        qCalendar.title.as("title"),
                        qCalendar.content.as("content"),
                        qCalendar.frstRegistDt.as("frstRegistDt"),
                        qCalendar.lastChangeDt.as("lastChangeDt"),
                        qCalendar.useYn.as("useYn")
                        ))
                .from(qCalendar)
                .where(qCalendar.memberSn.eq(calenderDto.getMemberSn()).and(qCalendar.useYn.eq("Y").and(qCalendar.recordDate.eq(calenderDto.getRecordDate()))))
                .fetch();

    }
}
