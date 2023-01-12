package com.example.nowpt.repository.reservation;

import com.example.nowpt.mvc.model.Notice;
import com.example.nowpt.mvc.model.QNotice;
import com.example.nowpt.mvc.model.QReservation;
import com.example.nowpt.mvc.model.Reservation;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Repository
public class ReservationCustomRepoImpl implements ReservationCustomRepo {

    @Autowired private JPAQueryFactory qf;
    private QReservation qReservation = QReservation.reservation;
    @Override
    public Page<Reservation> selectReservationPaging(Pageable pageable,String startDay, String endDay, String room){
        log.debug("reservation pageable : {}" , pageable);
        List<Reservation> result =
                qf
                        .selectFrom(qReservation)
                        .where(
                                qReservation.useDay.between(LocalDate.parse(startDay),LocalDate.parse(endDay)).and(qReservation.useYn.eq("Y")).and(qReservation.meetingRoom.eq(room))
                        )
                        .orderBy(qReservation.useDay.asc(),qReservation.useStartTime.asc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch();

        log.debug("reservationPaging result : {}" , result);

        long count =
                qf
                        .select(qReservation.count())
                        .from(qReservation)
                        .where(
                                qReservation.useDay.between(LocalDate.parse(startDay),LocalDate.parse(endDay)).and(qReservation.useYn.eq("Y")).and(qReservation.meetingRoom.eq(room))
                        )
                        .fetchCount();

        log.debug("reservationPaging count : {}",count);

        return new PageImpl<>(result,pageable,count);
    }

}

//    SELECT
//            USE_DAY ,
//            USE_START_TIME ,
//            USE_END_TIME ,
//            MEETING_ROOM
//    FROM TB_RESERVATION TR
//WHERE (USE_DAY = :startDay or USE_DAY = :endDay)
//    AND USE_YN = 'Y'
//    AND meeting_room = :room
//        ORDER BY USE_START_TIME ASC ;

