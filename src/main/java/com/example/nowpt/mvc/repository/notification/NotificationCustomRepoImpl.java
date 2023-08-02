package com.example.nowpt.mvc.repository.notification;

import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.model.Notification;
import com.example.nowpt.mvc.model.QCalendar;
import com.example.nowpt.mvc.model.QNotification;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class NotificationCustomRepoImpl implements NotificationCustomRepo {

    private final JPAQueryFactory queryFactory;
    QNotification notification = QNotification.notification;

    @Override
    public Page<Notification> findByUseYnAndTargetMemberSn(Long targetMemberSn, Pageable pageable) {
        QNotification subNotification = new QNotification("subNotification");

        // Subquery to fetch the total count
        long total = queryFactory
                .select(subNotification.count())
                .from(subNotification)
                .where(
                        subNotification.targetMemberSn.eq(targetMemberSn).and(subNotification.useYn.eq("Y")))
                .fetchOne();

//        return qf.selectFrom(qmem).where(qmem.membId.eq(id).and(qmem.useYn.eq("Y"))).fetchOne();
        List<Notification> content = queryFactory
                .selectFrom(notification)
                .where( notification.targetMemberSn.eq(targetMemberSn).and(notification.useYn.eq("Y")) )
                .orderBy(notification.frstRegistDt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(content, pageable, total);
    }

    @Transactional
    public long deleteAllNotificationByMemberSn(Long memberSn){
        log.debug("me s n : {} ",memberSn);
        return queryFactory
                .update(notification)
                .set(notification.useYn,"N")
                .where(
                        notification.targetMemberSn.eq(memberSn).and(notification.useYn.eq("Y")))
                .execute();
    }
}
