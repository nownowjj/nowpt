package com.example.nowpt.mvc.repository.friend;

import com.example.nowpt.mvc.model.Friend;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendCustomRepo {
    List<Friend> selectMyFriend(long memberSn);

}
