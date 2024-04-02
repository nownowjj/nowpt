package com.example.nowpt.repository.notice;

import com.example.nowpt.mvc.model.Notice;
import com.example.nowpt.mvc.model.QNotice;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

class ReservationCustomRepoImplTest {

    @Autowired
    private JPAQueryFactory qf;
    private QNotice qNotice = QNotice.notice;

    @Test
    public Page<Notice> selectNoticePagingTest(Pageable pageable){

        List<Notice> result =
                qf
                        .selectFrom(qNotice)
                        .orderBy(qNotice.frstRegistDt.desc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch();


        long count =
                qf
                        .select(qNotice.count())
                        .from(qNotice)
                        .fetchCount();

        System.out.println(result);

        return new PageImpl<>(result,pageable,count);
    }
}