package com.example.nowpt.mvc.restcontoller.friend;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.dto.FriendDto;
import com.example.nowpt.mvc.model.Friend;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Notification;
import com.example.nowpt.mvc.model.RequestStatus;
import com.example.nowpt.mvc.repository.friend.FriendRepo;
import com.example.nowpt.mvc.repository.notification.NotificationRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class FriendRestController {

    private final FriendRepo friendRepo;
    private final NotificationRepo notificationRepo;

    /**
     * @return 친구 목록에서 친구 신청을 보냄
     */
    @PostMapping("/api/auth/friend/apply/{friendMembSn}")
    public ResponseDto<?> insertFriend(@AuthenticationPrincipal Member member, @PathVariable Long friendMembSn){
        log.debug("본인 sn : {} , 친구 sn : {} "  ,member.getMemberSn() , friendMembSn);

        Friend newFriend = new Friend();
        newFriend.setMemberSn(member.getMemberSn());
        newFriend.setFriendMemberSn(friendMembSn);
        friendRepo.save(newFriend);

        Notification newNoti = new Notification();
        newNoti.setTargetMemberSn(friendMembSn);
        newNoti.setNotificationTitle("친구 요청이 왔습니다!!");
        newNoti.setNotificationContent(member.getMembNm()+"님 에게 친구 요청이 왔습니다.");
        notificationRepo.save(newNoti);



        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, friendRepo.save(newFriend));
    }

    @PutMapping("/api/auth/friend/apply")
    public ResponseDto<?> insertFriend(@AuthenticationPrincipal Member member, @RequestBody FriendDto friendDto){
        log.debug("수락여부 : {} "  ,friendDto.getAcceptYn());
        boolean acceptYn = friendDto.getAcceptYn();

        Friend friend = friendRepo.findByFriendSn(friendDto.getFriendSn());
        if(acceptYn){
            log.debug("수락임");
            friend.setRequestStatus(RequestStatus.ACCEPT);
            friendRepo.save(friend);

            Friend newFriend = new Friend();
            newFriend.setMemberSn(friend.getFriendMemberSn());
            newFriend.setFriendMemberSn(friend.getMemberSn());
            newFriend.setRequestStatus(RequestStatus.ACCEPT);
            friendRepo.save(newFriend);

        }else{
            log.debug("거절임");
            friend.setRequestStatus(RequestStatus.REFUSE);
            friendRepo.save(friend);
        }
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, acceptYn+"처리 완료");
    }

    @GetMapping("/api/auth/friend")
    public ResponseDto<?> selectMyFriend(@AuthenticationPrincipal Member member){
        log.debug("내 친구  조회 ");

        List<Friend> result = friendRepo.selectMyFriend(member.getMemberSn());

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS,    result);
    }
}
