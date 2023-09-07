package com.example.nowpt.mvc.repository.friend;

import com.example.nowpt.mvc.dto.FriendDto;
import com.example.nowpt.mvc.model.Friend;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendCustomRepo {
    List<FriendDto> selectMyFriend(long memberSn);
    List<FriendDto>selectMyWaitFriend(long memberSn);
    List<FriendDto> selectRecommendFriendList(long memberSn);
    List<FriendDto> selectMyRequestWaitFriendList(long memberSn);


    List<Friend> selectDeleteFriend(long membSn , long friendMembSn );
}
