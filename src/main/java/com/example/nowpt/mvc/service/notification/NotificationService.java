package com.example.nowpt.mvc.service.notification;

import com.example.nowpt.cmm.code.NotiMent;
import com.example.nowpt.mvc.model.Notification;
import com.example.nowpt.mvc.repository.notification.NotificationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepo notificationRepo;
    public Notification newNotification (String memberNm , Long targetMemberSn){
        Notification newNoti = new Notification();
        newNoti.setTargetMemberSn(targetMemberSn);
        newNoti.setNotificationTitle(NotiMent.NEW_FRIEND_TITLE);
        newNoti.setNotificationContent(memberNm+NotiMent.NEW_FRIEND_CONTENT);
        return notificationRepo.saveAndFlush(newNoti);
    }

}
