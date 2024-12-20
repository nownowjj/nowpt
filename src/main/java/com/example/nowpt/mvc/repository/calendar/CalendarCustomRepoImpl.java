package com.example.nowpt.mvc.repository.calendar;

import com.example.nowpt.mvc.dto.CalendarDto;
import com.example.nowpt.mvc.dto.CalendarSmDto;
import com.example.nowpt.mvc.model.QCalendar;
import com.example.nowpt.mvc.model.QComment;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class CalendarCustomRepoImpl implements CalendarCustomRepo {

    private final JPAQueryFactory queryFactory;
    QCalendar qCalendar = QCalendar.calendar;
    QCalendar qSubCalendar = new QCalendar("subCalendar");
    QComment qComment = QComment.comment;

    @Override
    public List<String> selectRecordDate(String recordDate , long memberSn) {
        return queryFactory
                .select(qCalendar.recordDate)
                .from(qCalendar)
                .where(
                        qCalendar.memberSn.eq(memberSn).and(qCalendar.useYn.eq("Y").and(qCalendar.recordDate.like(recordDate+'%')))
                )
                .fetch();

    }

    @Override
    public List<CalendarDto> selectDetailRecord(CalendarDto calendarDto) {
        return queryFactory
                .select(Projections.fields(CalendarDto.class,
                        qCalendar.calendarSn.as("calendarSn"),
                        qCalendar.memberSn.as("memberSn"),
                        qCalendar.recordDate.as("recordDate"),
                        qCalendar.title.as("title"),
                        qCalendar.content.as("content"),
                        qCalendar.frstRegistDt.as("frstRegistDt"),
                        qCalendar.lastChangeDt.as("lastChangeDt"),
                        qCalendar.useYn.as("useYn"),
                        qCalendar.importYn.as("importYn"),
                        qCalendar.imageUrl.as("imageUrl"),
                        ExpressionUtils.as(
                                JPAExpressions.select(qComment.count())
                                        .from(qComment)
                                        .where(qComment.useYn.eq("Y").and(qComment.calendarSn.eq(qCalendar.calendarSn))),
                                "commentCount"
                        )
                        ))
                .from(qCalendar)
                .where(
                        qCalendar.memberSn.eq(calendarDto.getMemberSn())
                                .and(qCalendar.useYn.eq("Y").and(qCalendar.recordDate.eq(calendarDto.getRecordDate())))
                      )
                .orderBy(qCalendar.frstRegistDt.desc())
                .fetch();
    }

    @Override
    public List<CalendarSmDto> selectMyRecordSm(Long membSn) {
        return queryFactory
                .select(Projections.fields(CalendarSmDto.class,
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
    public Page<CalendarDto> findImportRecordByMembSn(Long memberSn, Pageable pageable) {

        // Subquery to fetch the total count
        long total = queryFactory
                .select(qSubCalendar.count())
                .from(qSubCalendar)
                .where(qSubCalendar.memberSn.eq(memberSn)
                        .and(qSubCalendar.importYn.eq(true)).and(qSubCalendar.useYn.eq("Y")))
                .fetchOne();


        List<CalendarDto> content = queryFactory
                .select(Projections.fields(CalendarDto.class,
                        qCalendar.calendarSn.as("calendarSn"),
                        qCalendar.memberSn.as("memberSn"),
                        qCalendar.recordDate.as("recordDate"),
                        qCalendar.title.as("title"),
                        qCalendar.content.as("content"),
                        qCalendar.frstRegistDt.as("frstRegistDt"),
                        qCalendar.lastChangeDt.as("lastChangeDt"),
                        qCalendar.useYn.as("useYn"),
                        qCalendar.importYn.as("importYn"),
                        ExpressionUtils.as(
                                JPAExpressions.select(qComment.count())
                                        .from(qComment)
                                        .where(qComment.useYn.eq("Y").and(qComment.calendarSn.eq(qCalendar.calendarSn))),
                                "commentCount"
                        )
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

    @Override
    public Page<CalendarDto> selectMyFriendRecord(long memberSn, Pageable pageable) {
        JPAQuery<Long> total = queryFactory
                .select(qSubCalendar.count())
                .from(qSubCalendar)
                .where(
                        qSubCalendar.memberSn.eq(memberSn)
                        .and(qSubCalendar.useYn.eq("Y"))
                );


        List<CalendarDto> content = queryFactory
                .select(Projections.fields(CalendarDto.class,
                        qCalendar.calendarSn.as("calendarSn"),
                        qCalendar.memberSn.as("memberSn"),
                        qCalendar.recordDate.as("recordDate"),
                        qCalendar.title.as("title"),
                        qCalendar.content.as("content"),
                        qCalendar.frstRegistDt.as("frstRegistDt"),
                        qCalendar.lastChangeDt.as("lastChangeDt"),
                        qCalendar.useYn.as("useYn"),
                        qCalendar.importYn.as("importYn"),
                        ExpressionUtils.as(
                                JPAExpressions.select(qComment.count())
                                        .from(qComment)
                                        .where(qComment.useYn.eq("Y").and(qComment.calendarSn.eq(qCalendar.calendarSn))),
                                "commentCount"
                        )
                ))
                .from(qCalendar)
                .where(
                        qCalendar.memberSn.eq(memberSn)
                                .and(qCalendar.useYn.eq("Y"))
                )
                .orderBy(qCalendar.frstRegistDt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return PageableExecutionUtils.getPage(content, pageable, total::fetchOne);
    }

}
