package com.example.nowpt.mvc.restcontoller.notification;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.NotificationDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Notification;
import com.example.nowpt.mvc.repository.notification.NotificationRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationRestController {

    private final NotificationRepo notificationRepo;

    @PostMapping("")
    public ResponseDto<?> insertNotification(@RequestBody NotificationDto notificationDto){
        log.debug("알림 등록 : {} , {} , {}"  ,notificationDto.getNotiTitle() , notificationDto.getNotiContent() , notificationDto.getTargetMembSn());
        Notification newNoti = new Notification();
        newNoti.setNotificationTitle(notificationDto.getNotiTitle());
        newNoti.setNotificationContent(notificationDto.getNotiContent());
        newNoti.setTargetMemberSn(notificationDto.getTargetMembSn());
        newNoti.setUseYn("Y");
//        notificationRepo.save(newNoti);
        return ResponseUtil.SUCCESS(Cd.POST_SUCCESS,    notificationRepo.save(newNoti));
    }

    @GetMapping("")
    public ResponseDto<?> selectNotification(@AuthenticationPrincipal Member member, Pageable pageable){

        Page<Notification> result = notificationRepo.findByUseYnAndTargetMemberSn(member.getMemberSn(),pageable);
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, result);
    }

    @GetMapping("/count")
    public ResponseDto<?> selectNotificationCount(@AuthenticationPrincipal Member member){
        Long count = notificationRepo.countByTargetMemberSnAndUseYn(member.getMemberSn(),"Y");
        log.debug("알림 : {}" , count);
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS,  count);
    }



    @PutMapping("")
    public ResponseDto<?> deleteNotification(@RequestBody NotificationDto notificationDto){
        log.debug("알림 단건 삭제 : {} "  ,notificationDto.getNotificationSn());
        Notification deleteNoti = notificationRepo.findByNotificationSn(notificationDto.getNotificationSn());
        deleteNoti.setUseYn("N");
        notificationRepo.save(deleteNoti);
        return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS,null);
    }

    @DeleteMapping("")
    public ResponseDto<?> deleteNotificationAll(@AuthenticationPrincipal Member member){
        log.debug("알림 삭제 싸그리 다: {} "  ,member.getMemberSn());
        long deleteAllCount = notificationRepo.deleteAllNotificationByMemberSn(member.getMemberSn());
        return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS,deleteAllCount);
    }
}
