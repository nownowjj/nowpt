package com.example.nowpt.mvc.repository.friend;

import com.example.nowpt.mvc.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepo extends JpaRepository<Friend, Long> , FriendCustomRepo {
    Friend findByFriendSn(long friendSn);

    Friend findByRequestStatusAndMemberSnAndFriendMemberSn(String requestStatus, long membSn, long friendMembSn);

    Friend findByMemberSnAndFriendMemberSn(long friendMemberSn, long memberSn);
}
