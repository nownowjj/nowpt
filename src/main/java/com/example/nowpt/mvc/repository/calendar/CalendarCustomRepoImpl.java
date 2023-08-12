package com.example.nowpt.mvc.repository.calendar;

import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.dto.CalenderSmDto;
import com.example.nowpt.mvc.dto.LoginHstDto;
import com.example.nowpt.mvc.model.QCalendar;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
                        qCalendar.useYn.as("useYn"),
                        qCalendar.importYn.as("importYn")
                        ))
                .from(qCalendar)
                .where(qCalendar.memberSn.eq(calenderDto.getMemberSn()).and(qCalendar.useYn.eq("Y").and(qCalendar.recordDate.eq(calenderDto.getRecordDate()))))
                .fetch();

    }

    @Override
    public List<CalenderSmDto> selectMyRecordSm(Long membSn) {
        return queryFactory
                .select(Projections.fields(CalenderSmDto.class,
                        qCalendar.recordDate.substring(0, 4).as("year"),
                        qCalendar.recordDate.substring(4, 6).as("month"),
                        qCalendar.recordDate.count().as("monthCount")
                ))
                .from(qCalendar)
                .where(qCalendar.memberSn.eq(membSn).and(qCalendar.useYn.eq("Y")))
                .groupBy(qCalendar.recordDate.substring(0, 4), qCalendar.recordDate.substring(4, 6))
                .orderBy(qCalendar.recordDate.substring(0, 4).asc(), qCalendar.recordDate.substring(4, 6).asc())
                .fetch();
    }

    @Override
    public Page<CalenderDto> findImportRecordByMembSn(Long memberSn, Pageable pageable) {
        QCalendar qSubCalendar = new QCalendar("subCalendar");

        // Subquery to fetch the total count
        long total = queryFactory
                .select(qSubCalendar.count())
                .from(qSubCalendar)
                .where(qSubCalendar.memberSn.eq(memberSn)
                        .and(qSubCalendar.importYn.eq(true)).and(qSubCalendar.useYn.eq("Y")))
                .fetchOne();


        List<CalenderDto> content = queryFactory
                .select(Projections.fields(CalenderDto.class,
                        qCalendar.calendarSn.as("calendarSn"),
                        qCalendar.memberSn.as("memberSn"),
                        qCalendar.recordDate.as("recordDate"),
                        qCalendar.title.as("title"),
                        qCalendar.content.as("content"),
                        qCalendar.frstRegistDt.as("frstRegistDt"),
                        qCalendar.lastChangeDt.as("lastChangeDt"),
                        qCalendar.useYn.as("useYn"),
                        qCalendar.importYn.as("importYn")
                ))
                .from(qCalendar)
                .where(
                        qCalendar.memberSn.eq(memberSn).and(qCalendar.importYn.eq(true)).and(qCalendar.useYn.eq("Y"))
                      )
                .orderBy(qCalendar.frstRegistDt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(content, pageable, total);
    }

}
