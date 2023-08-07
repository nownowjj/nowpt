package com.example.nowpt.mvc.repository.friend;

import com.example.nowpt.mvc.model.Friend;
import com.example.nowpt.mvc.model.QFriend;
import com.example.nowpt.mvc.model.RequestStatus;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class FriendCustomRepoImpl implements FriendCustomRepo {

    private final JPAQueryFactory queryFactory;

    QFriend qFriend = QFriend.friend;


    @Override
    public List<Friend> selectMyFriend(long memberSn) {
        return queryFactory
                .selectFrom(qFriend)
                .where(qFriend.memberSn.eq(memberSn).and(qFriend.requestStatus.eq(RequestStatus.ACCEPT)))
                .fetch();
    }
}
