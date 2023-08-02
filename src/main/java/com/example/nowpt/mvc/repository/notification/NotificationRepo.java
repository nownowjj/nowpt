package com.example.nowpt.mvc.repository.notification;

import com.example.nowpt.mvc.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> , NotificationCustomRepo {
    Notification findByNotificationSn(Long notificationSn);

    Long countByTargetMemberSnAndUseYn(Long targetMemberSn , String useYn);
}
