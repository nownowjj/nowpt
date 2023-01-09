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

import java.util.List;

@Slf4j
@Repository
public class ReservationCustomRepoImpl implements ReservationCustomRepo {

    @Autowired private JPAQueryFactory qf;
    private QReservation qReservation = QReservation.reservation;
    @Override
    public Page<Reservation> selectReservationPaging(Pageable pageable){
        log.debug("reservation pageable : {}" , pageable);
        List<Reservation> result =
                qf
                        .selectFrom(qReservation)
                        .orderBy(qReservation.useDay.asc(),qReservation.useStartTime.asc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch();

        log.debug("reservationPaging result : {}" , result);

        long count =
                qf
                        .select(qReservation.count())
                        .from(qReservation)
                        .fetchCount();

        log.debug("reservationPaging count : {}",count);

        return new PageImpl<>(result,pageable,count);
    }

}

