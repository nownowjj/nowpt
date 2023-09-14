package com.example.nowpt.mvc.service.notification;

import com.example.nowpt.mvc.model.Notification;
import com.example.nowpt.mvc.repository.notification.NotificationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.example.nowpt.cmm.code.NotiMent.*;
@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepo notificationRepo;
    public void notificationNewFriendRequest (String memberNm , Long targetMemberSn){
        Notification newNoti = new Notification();
        newNoti.setTargetMemberSn(targetMemberSn);
        newNoti.setNotificationTitle(NEW_FRIEND_TITLE);
        newNoti.setNotificationContent(memberNm+NEW_FRIEND_CONTENT);
        notificationRepo.saveAndFlush(newNoti);
    }

}
