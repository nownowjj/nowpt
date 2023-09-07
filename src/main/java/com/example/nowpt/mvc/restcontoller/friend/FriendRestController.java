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

import static com.example.nowpt.cmm.code.Cd.*;

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

        // 요청을 보내기전에 친구가 이미 나에게 요청을 보냈는지 체크
        Friend requestCheck = friendRepo.findByMemberSnAndFriendMemberSn(friendDto.getFriendMemberSn() , member.getMemberSn());
        if(requestCheck != null){
            requestCheck.setRequestStatus("ACCEPT");
            friendRepo.save(requestCheck);

            Friend newFriend = new Friend();
            newFriend.setMemberSn(requestCheck.getFriendMemberSn());
            newFriend.setFriendMemberSn(requestCheck.getMemberSn());
            newFriend.setRequestStatus("ACCEPT");
            friendRepo.save(newFriend);
            return ResponseUtil.SUCCESS(F_DIRECT_ACCEPT_MSG, F_DIRECT_ACCEPT);
        }

        friendService.insertFriend(friendDto);
        Notification notification =  notificationService.newNotification( member.getMembNm(),friendDto.getFriendMemberSn());

        return ResponseUtil.SUCCESS(F_REQUEST_SUCCESS_MSG, F_REQUEST_SUCCESS);
    }

    /**
     *
     * @param member
     * @param friendDto
     * @return 친구 수락 or 거절
     */
    @PutMapping("/api/auth/friend/apply")
    public ResponseDto<?> updateFriend(@AuthenticationPrincipal Member member, @RequestBody FriendDto friendDto){
        log.debug("수락여부 : {} "  ,friendDto.getAcceptYn());
        boolean acceptYn = friendDto.getAcceptYn();

        String resultMsg = acceptYn ? "수락 완료":"거절 완료";

        Friend friend = friendRepo.findByFriendSn(friendDto.getFriendSn());
        if(friend == null) return ResponseUtil.FAILURE(Cd.PUT_FAIL, "취소된 요청입니다");
        if(acceptYn){
            log.debug("수락임");
            friend.setRequestStatus("ACCEPT");
            friendRepo.save(friend);

            Friend newFriend = new Friend();
            newFriend.setMemberSn(friend.getFriendMemberSn());
            newFriend.setFriendMemberSn(friend.getMemberSn());
            newFriend.setRequestStatus("ACCEPT");
            friendRepo.save(newFriend);

        }else{
            log.debug("거절임");
            friend.setRequestStatus("REFUSE");
            friendRepo.save(friend);
        }
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, resultMsg);
    }

    // 본인에게 친구 신청을 한 목록 조회
    @GetMapping("/api/auth/friend/apply")
    public ResponseDto<?> selectMyWaitFriendList(@AuthenticationPrincipal Member member){
        log.debug("나에게 신청 한 친구 조회 : {}",member.getMemberSn());
      List<FriendDto> result = friendRepo.selectMyWaitFriend(member.getMemberSn());

      return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, result);
    }

    // 본인이 친구 요청을 한 목록
    @GetMapping("/api/auth/friend/requestWait")
    public ResponseDto<?> selectMyRequestWaitFriendList(@AuthenticationPrincipal Member member){
        log.debug("내가 신청 한 친구 조회 : {}",member.getMemberSn());
        List<FriendDto> result = friendRepo.selectMyRequestWaitFriendList(member.getMemberSn());

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, result);
    }


    // 내 친구 조회
    @GetMapping("/api/auth/friend/myFriend")
    public ResponseDto<?> selectMyFriendList(@AuthenticationPrincipal Member member){
        log.debug("내 친구  조회 ");

        List<FriendDto> result = friendRepo.selectMyFriend(member.getMemberSn());

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS,    result);
    }

    // 친구 목록 조회
    @GetMapping("/api/auth/friend")
    public ResponseDto<?> selectRecommendFriendList(@AuthenticationPrincipal Member member){
        log.debug("친구 목록 조회 ");

        List<FriendDto> result = friendRepo.selectRecommendFriendList(member.getMemberSn());

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS,    result);
    }

    /**
     * 보낸 요청 취소
     * 1. friendSn => requestStatus 상태 조회 WAIT or REFUSE 상태이면 status = CANCEL 변경
     * 2. membSn , friendMembSn 이력이 남아있다면 delete
     * @param friendDto{friendSn}
     * @return msg
     */
    @PutMapping("/api/auth/friend/cancel")
    public ResponseDto<?> cancelRequestFriend(@RequestBody FriendDto friendDto){
        Friend friend = friendRepo.findByFriendSn(friendDto.getFriendSn());
        if( "WAIT".equals(friend.getRequestStatus()) || "REFUSE".equals(friend.getRequestStatus()) ){
//            friendService.cancelDeleteService(friend.getMemberSn() , friend.getFriendMemberSn());
//            friend.setRequestStatus("CANCEL");
            friendRepo.delete(friend);
            return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, "요청이 취소되었습니다.");
        }else{
            return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, "이미 수락된 요청입니다.");
        }
    }

    @DeleteMapping("/api/auth/friend/cancel")
    public ResponseDto<?> deleteFriend(@RequestBody FriendDto friendDto){
        log.debug("dd : {}",friendDto);
        List<Friend> friend = friendService.selectDeleteFriend(friendDto.getMemberSn(),friendDto.getFriendMemberSn());
        log.debug("읭 : {}",friend);
        friendRepo.deleteAll(friend);
        return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, "친구 삭제 성공");
    }


}
