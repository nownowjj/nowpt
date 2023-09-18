package com.example.nowpt.mvc.service.friend;

import com.example.nowpt.mvc.dto.FriendDto;
import com.example.nowpt.mvc.model.Friend;
import com.example.nowpt.mvc.repository.friend.FriendRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import static com.example.nowpt.cmm.code.FriendRequest.*;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepo friendRepo;

    public void insertFriend(FriendDto friendDto){ // 대상자에게 친구 신청
        Friend refuseFriend = this.findByRefuseStatus(friendDto); // 요청전에 대상자가 내가 한 요청을 거절한적이 있는지
        if(refuseFriend != null){   // 거절 이력이 있음
            refuseFriend.setRequestStatus("WAIT");
            friendRepo.save(refuseFriend);  // 해당 데이터를 변경하여 저장
        }else {
            Friend newFriend = new Friend();   // 이력이 없음
            newFriend.setMemberSn(friendDto.getMemberSn());
            newFriend.setFriendMemberSn(friendDto.getFriendMemberSn());
            newFriend.setRequestStatus("WAIT");
            friendRepo.save(newFriend);   // 요청정보 저장
        }
    }

    private Friend findByRefuseStatus(FriendDto friendDto){
        return friendRepo.findByRequestStatusAndMemberSnAndFriendMemberSn("REFUSE", friendDto.getMemberSn(), friendDto.getFriendMemberSn());
    }


    public List<Friend> selectDeleteFriend(long membSn , long friendMembSn){
        return friendRepo.selectDeleteFriend(membSn,friendMembSn);
    }

    // 친구요청을 수락할 때 상대방이 보낸 요청의 데이터를 사용
    public Friend createNewFriend(long myMembSn , long friendMembSn){
        Friend newFriend = new Friend();
        newFriend.setMemberSn(myMembSn);// 상대방이 보낸 요청의 friendMemberSn은 본인임
        newFriend.setFriendMemberSn(friendMembSn);// 상대방이 보낸 요청의 memberSn은 상대임
        newFriend.setRequestStatus(ACCEPT);
        return newFriend;
    }
}
