package com.example.nowpt.mvc.restcontoller.friend;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.FriendDto;
import com.example.nowpt.mvc.model.Friend;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Notification;
import com.example.nowpt.mvc.repository.friend.FriendRepo;
import com.example.nowpt.mvc.repository.notification.NotificationRepo;
import com.example.nowpt.mvc.service.friend.FriendService;
import com.example.nowpt.mvc.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

import static com.example.nowpt.cmm.code.Cd.*;
import static com.example.nowpt.cmm.code.FriendRequest.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/friend")
public class FriendRestController {

    private final FriendRepo friendRepo;
    private final FriendService friendService;
    private final NotificationService notificationService;

    /**
     @title 친구 요청 보내기
     1.   (client)친구추천 목록에서 친구 요청을 보낸다.
     2.   대상자와 본인의 현재 관계를 조회한다.
     3.   관계가 존재한다면 내가 요청을 보내기전에 상대방이 나에게 먼저 요청을 보낸 것이다.
     3-1. 바로 상대방과 친구관계를 성립한다.
     4.   관계가 존재하지 않다면 친구 요청을 보낸다.
     Notification (친구요청 성공시 상대방에게 전송 , 바로 친구관계가 성립되었을떄 전송)
     */
    @PostMapping("/apply")
    public ResponseDto<?> insertFriend(@AuthenticationPrincipal Member member, @RequestBody FriendDto friendDto){
        friendDto.setMemberSn(member.getMemberSn());
        Friend requestCheck = friendRepo.findByMemberSnAndFriendMemberSn(friendDto.getFriendMemberSn() , member.getMemberSn()); //(2)
        if(requestCheck != null){  //(3)
            requestCheck.setRequestStatus(ACCEPT);
            friendRepo.save(requestCheck);

//            Friend newFriend = new Friend();
            Friend newFriend = friendService.createNewFriend(requestCheck.getFriendMemberSn() , requestCheck.getMemberSn()); // requestCheck 의 friendMemberSn는 본인이다
//            newFriend.setMemberSn(requestCheck.getFriendMemberSn());
//            newFriend.setFriendMemberSn(requestCheck.getMemberSn());
//            newFriend.setRequestStatus(ACCEPT);
//            friendRepo.save(newFriend);
            friendRepo.saveAll(Arrays.asList(requestCheck, newFriend));
            return ResponseUtil.SUCCESS(F_DIRECT_ACCEPT_MSG, F_DIRECT_ACCEPT);  //(3-1)
        }
        friendService.insertFriend(friendDto);  //(4)
        notificationService.notificationNewFriendRequest( member.getMembNm(),friendDto.getFriendMemberSn()); // 대상자에게 친구요청이 왔다는 알림 전송

        return ResponseUtil.SUCCESS(F_REQUEST_SUCCESS_MSG, F_REQUEST_SUCCESS);
    }

    /**
     * @title 친구요청 수락 or 거절
     */
    @PutMapping("/apply")
    public ResponseDto<?> updateFriend(@RequestBody FriendDto friendDto){
        boolean acceptYn = friendDto.getAcceptYn();
        Friend friend = friendRepo.findByFriendSn(friendDto.getFriendSn()); // 나에게 온 요청 조회 By pk
        if(friend == null && !acceptYn)return ResponseUtil.SUCCESS(F_REQUEST_REFUSE_MSG, F_REQUEST_REFUSE); //거절된 요청이고 또한 거절함
        else if (friend == null)return ResponseUtil.SUCCESS(F_CANCELED_REQUEST_MSG, F_CANCELED_REQUEST);  // 거절된 요청을 수락 하였음

        if (acceptYn) { // 수락
            friend.setRequestStatus(ACCEPT); // 나에게 온 요청 상태 변경
            Friend newFriend = friendService.createNewFriend(friend.getFriendMemberSn() , friend.getMemberSn()); // 상대방이 보낸 요청의 friendMemberSn은 본인임
            friendRepo.saveAll(Arrays.asList(friend, newFriend));
            return ResponseUtil.SUCCESS(F_REQUEST_ACCEPT_MSG, F_REQUEST_ACCEPT);
        } else{
            friend.setRequestStatus(REFUSE); // 상대방이 보낸 요청 거절
            friendRepo.save(friend);
            return ResponseUtil.SUCCESS(F_REQUEST_REFUSE_MSG, F_REQUEST_REFUSE);
        }
    }

    // 본인에게 친구 신청을 한 목록 조회
    @GetMapping("/apply")
    public ResponseDto<?> selectMyWaitFriendList(@AuthenticationPrincipal Member member){
      List<FriendDto> result = friendRepo.selectMyWaitFriend(member.getMemberSn());

      return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, result);
    }

    // 본인이 친구 요청을 한 목록
    @GetMapping("/requestWait")
    public ResponseDto<?> selectMyRequestWaitFriendList(@AuthenticationPrincipal Member member){
        log.debug("내가 신청 한 친구 조회 : {}",member.getMemberSn());
        List<FriendDto> result = friendRepo.selectMyRequestWaitFriendList(member.getMemberSn());

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, result);
    }


    // 내 친구 조회
    @GetMapping("/myFriend")
    public ResponseDto<?> selectMyFriendList(@AuthenticationPrincipal Member member){
        log.debug("내 친구  조회 ");

        List<FriendDto> result = friendRepo.selectMyFriend(member.getMemberSn());

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS,    result);
    }

    // 친구 목록 조회
    @GetMapping("")
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
    @PutMapping("/cancel")
    public ResponseDto<?> cancelRequestFriend(@RequestBody FriendDto friendDto){
        Friend friend = friendRepo.findByFriendSn(friendDto.getFriendSn());
        if(friend == null){
            return ResponseUtil.SUCCESS(F_REQUEST_CANCEL_SUCCESS_MSG, F_REQUEST_CANCEL_SUCCESS); // 요청을 보냄 > 상대방이 요청을 수락하였다가 친구 삭제함 > 요청을 취소 NPE 방지
        }
        if(!ACCEPT.equals(friend.getRequestStatus())){ // ㅈ
            friendRepo.delete(friend);
            return ResponseUtil.SUCCESS(F_REQUEST_CANCEL_SUCCESS_MSG, F_REQUEST_CANCEL_SUCCESS);
        }else{
            return ResponseUtil.SUCCESS(F_REQUEST_ALREADY_ACCEPT_MSG, F_REQUEST_ALREADY_ACCEPT); // 요청을 거절하기전에 상대방이 이미 수락 하였음
        }
    }

    @DeleteMapping("/cancel")
    public ResponseDto<?> deleteFriend(@AuthenticationPrincipal Member member ,@RequestBody FriendDto friendDto){
        List<Friend> friend = friendService.selectDeleteFriend(member.getMemberSn(),friendDto.getFriendMemberSn());
        if(friend != null) friendRepo.deleteAll(friend);
        return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, "친구 삭제 성공");
    }



}
