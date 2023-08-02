package com.example.nowpt.mvc.repository.notification;

import com.example.nowpt.mvc.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationCustomRepo {
    Page<Notification> findByUseYnAndTargetMemberSn(Long targetMemberSn, Pageable pageable);
    long deleteAllNotificationByMemberSn(Long memberSn);
}
