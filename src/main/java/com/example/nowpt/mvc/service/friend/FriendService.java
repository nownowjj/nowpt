package com.example.nowpt.mvc.service.friend;

import com.example.nowpt.mvc.dto.FriendDto;
import com.example.nowpt.mvc.model.Friend;
import com.example.nowpt.mvc.repository.friend.FriendRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepo friendRepo;

    public void insertFriend(FriendDto friendDto){
        Friend refuseFriend = this.findByRefuseStatus(friendDto);
        if(refuseFriend != null){
            refuseFriend.setRequestStatus("WAIT");
            friendRepo.save(refuseFriend);
        }else {
            Friend newFriend = new Friend();
            newFriend.setMemberSn(friendDto.getMemberSn());
            newFriend.setFriendMemberSn(friendDto.getFriendMemberSn());
            newFriend.setRequestStatus("WAIT");
            friendRepo.save(newFriend);
        }
    }

    private Friend findByRefuseStatus(FriendDto friendDto){
        return friendRepo.findByRequestStatusAndMemberSnAndFriendMemberSn("REFUSE", friendDto.getMemberSn(), friendDto.getFriendMemberSn());
    }

//    public void cancelDeleteService(long membSn , long friendMembSn){
//        Friend friend = friendRepo.findByMembSnAndFriendMembSn(membSn ,friendMembSn);
//        friendRepo.delete(friend);
//    }

    public List<Friend> selectDeleteFriend(long membSn , long friendMembSn){
        return friendRepo.selectDeleteFriend(membSn,friendMembSn);
    }

}
