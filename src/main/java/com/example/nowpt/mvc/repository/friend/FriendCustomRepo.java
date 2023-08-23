package com.example.nowpt.mvc.repository.friend;

import com.example.nowpt.mvc.dto.FriendDto;
import com.example.nowpt.mvc.model.Friend;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendCustomRepo {
    List<FriendDto> selectMyFriend(Long memberSn);
    List<FriendDto>selectMyWaitFriend(Long memberSn);
    List<FriendDto> selectRecommendFriendList(Long memberSn);
    List<FriendDto> selectMyRequestWaitFriendList(Long memberSn);


}
