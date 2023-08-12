package com.example.nowpt.mvc.service.friend;

import com.example.nowpt.mvc.dto.FriendDto;
import com.example.nowpt.mvc.model.Friend;
import com.example.nowpt.mvc.repository.friend.FriendRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepo friendRepo;

    public void insertFriend(FriendDto friendDto){
        Friend newFriend = new Friend();
        newFriend.setMemberSn(friendDto.getMemberSn());
        newFriend.setFriendMemberSn(friendDto.getFriendMemberSn());
        friendRepo.save(newFriend);
    }

}
