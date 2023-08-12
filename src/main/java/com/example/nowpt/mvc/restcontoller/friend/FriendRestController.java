package com.example.nowpt.mvc.restcontoller.friend;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.FriendDto;
import com.example.nowpt.mvc.model.Friend;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Notification;
import com.example.nowpt.mvc.model.RequestStatus;
import com.example.nowpt.mvc.repository.friend.FriendRepo;
import com.example.nowpt.mvc.repository.notification.NotificationRepo;
import com.example.nowpt.mvc.service.friend.FriendService;
import com.example.nowpt.mvc.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class FriendRestController {

    private final FriendRepo friendRepo;
    private final NotificationRepo notificationRepo;
    private final FriendService friendService;
    private final NotificationService notificationService;

    /**
     * @return 친구 목록에서 친구 신청을 보냄
     */
    @PostMapping("/api/auth/friend/apply")
    public ResponseDto<?> insertFriend(@AuthenticationPrincipal Member member, @RequestBody FriendDto friendDto){
        log.debug("본인 sn : {} , 친구 sn : {} "  ,member.getMemberSn() , friendDto.getFriendMemberSn());
        friendDto.setMemberSn(member.getMemberSn());

        friendService.insertFriend(friendDto);
        Notification notification =  notificationService.newNotification( member.getMembNm(),friendDto.getFriendMemberSn());

        return ResponseUtil.SUCCESS(Cd.POST_SUCCESS, "친구 요청 성공");
    }

    @PutMapping("/api/auth/friend/apply")
    public ResponseDto<?> updateFriend(@AuthenticationPrincipal Member member, @RequestBody FriendDto friendDto){
        log.debug("수락여부 : {} "  ,friendDto.getAcceptYn());
        boolean acceptYn = friendDto.getAcceptYn();

        String resultMsg = acceptYn ? "수락 완료":"거절 완료";

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
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, resultMsg);
    }

    // 본인에게 친구 신청을 한 목록
    @GetMapping("/api/auth/friend/apply")
    public ResponseDto<?> selectMyWaitFriendList(@AuthenticationPrincipal Member member){
        log.debug("나에게 신청 한 친구 조회 : {}",member.getMemberSn());
      List<FriendDto> result = friendRepo.selectMyWaitFriend(member.getMemberSn());

      return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, result);
    }

    // 내 친구 조회
    @GetMapping("/api/auth/friend/myFriend")
    public ResponseDto<?> selectMyFriendList(@AuthenticationPrincipal Member member){
        log.debug("내 친구  조회 ");

        List<Friend> result = friendRepo.selectMyFriend(member.getMemberSn());

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS,    result);
    }

    @GetMapping("/api/auth/friend")
    public ResponseDto<?> selectFriendList(@AuthenticationPrincipal Member member){
        log.debug("친구 목록 조회 ");

        List<FriendDto> result = friendRepo.selectFriendList(member.getMemberSn());

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS,    result);
    }
}
