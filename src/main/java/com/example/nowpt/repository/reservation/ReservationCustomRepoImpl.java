package com.example.nowpt.repository.reservation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class ReservationCustomRepoImpl implements ReservationCustomRepo {

    @Autowired private JPAQueryFactory qf;
//    private QReservation qr;
//    public List<Integer> availabilityReservation(LocalDate useDay, LocalDateTime useStartTime, LocalDateTime useEndTime) {
//        return Math.toIntExact(qf
//                .select(qr.count())
//                .from(qr)
//                .where(qr.useDay.eq(useDay))
//                        .and()
//                .fetchFirst());
//    }
//
//    @Override
//    public void availabilityReservation(LocalDate useDay, LocalDateTime useStartTime, LocalDateTime useEndTime) {
//
//    }
//
////    SELECT
////    TO_CHAR(TR.USE_DAY,'YYYY-MM-DD') AS day,
////    TR.USE_START_TIME ,
////    TR.USE_END_TIME ,
////    TR.*
////    count(1)
////    FROM TB_RESERVATION TR
////            WHERE
////    TR.USE_DAY = :USE_DAY
////    AND(
////                    TR.USE_START_TIME BETWEEN :startData AND :endData
////                    OR
////                    TR.USE_END_TIME BETWEEN :startData AND :endData
////                    OR
////                    :startData BETWEEN USE_START_TIME AND USE_END_TIME
////            );
}
