package com.example.nowpt.repository.notice;

import com.example.nowpt.mvc.model.Notice;
import com.example.nowpt.mvc.model.QNotice;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class NoticeCustomRepoImpl implements NoticeCustomRepo {

    @Autowired private JPAQueryFactory qf;

    private QNotice qNotice = QNotice.notice;

    @Override
    public Page<Notice> selectNoticePaging(Pageable pageable){

        List<Notice> result =
                qf
                        .select(qNotice)
                        .from(qNotice)
                        .orderBy(qNotice.frstRegistDt.desc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch();

        log.debug("noticePaging result : {}" , result);

        long count =
                qf
                        .select(qNotice.count())
                        .from(qNotice)
                        .fetchCount();

        log.debug("noticePaging count : {}",count);

        return new PageImpl<>(result,pageable,count);
    }
}
