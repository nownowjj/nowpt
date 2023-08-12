package com.example.nowpt.mvc.repository.friend;

import com.example.nowpt.mvc.dto.FriendDto;
import com.example.nowpt.mvc.model.*;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class FriendCustomRepoImpl implements FriendCustomRepo {

    private final JPAQueryFactory queryFactory;

    QFriend qFriend = QFriend.friend;
    QMember qMember = QMember.member;


    @Override
    public List<Friend> selectMyFriend(Long memberSn) {
        return queryFactory
                .selectFrom(qFriend)
                .where(qFriend.memberSn.eq(memberSn).and(qFriend.requestStatus.eq(RequestStatus.ACCEPT)))
                .fetch();
    }

    @Override
    public List<FriendDto> selectMyWaitFriend(Long memberSn) {
        return queryFactory
                .select(Projections.fields(FriendDto.class,
                        qFriend.friendSn.as("friendSn"),
                        qFriend.friendMemberSn.as("friendMemberSn"),
                        qMember.membNm.as("friendNm"),
                        qFriend.frstRegistDt.as("frstRegistDt"),
                        qMember.profileImage.as("friendProfile")
                ))
                .from(qFriend)
                .leftJoin(qMember)
                .on(qFriend.memberSn.eq(qMember.memberSn))
                .where(
                        qFriend.friendMemberSn.eq(memberSn)
                                .and(qFriend.requestStatus.eq(RequestStatus.WAIT))
                )
                .orderBy(qFriend.frstRegistDt.desc())
                .fetch();
    }


    @Override
    public List<FriendDto> selectFriendList(Long memberSn) {
        BooleanExpression notInSubquery = qMember.memberSn.notIn(
                JPAExpressions
                        .select(qFriend.friendMemberSn)
                        .from(qFriend)
                        .where(qFriend.memberSn.eq(memberSn)
                                .and(qFriend.requestStatus.ne(RequestStatus.REFUSE)))
        );

        return queryFactory
                .select(Projections.fields(FriendDto.class,
                        qMember.memberSn.as("friendMemberSn"),
                        qMember.membNm.as("friendNm"),
                        qMember.frstRegistDt.as("frstRegistDt"),
                        qMember.profileImage.as("friendProfile"),
                        qFriend.requestStatus.stringValue().as("requestStatus")
                        ))
                .from(qMember)
                .leftJoin(qFriend)
                .on(qMember.memberSn.eq(qFriend.memberSn).and(qFriend.friendMemberSn.eq(memberSn).and(qFriend.useYn.eq("Y"))))
                .where(
                        qMember.memberSn.ne(memberSn)
                            .and(qMember.useYn.eq("Y")
                                .and(qFriend.requestStatus.ne(RequestStatus.WAIT).or(qFriend.requestStatus.isNull()))
                                )
                        )
                .fetch();
    }
}
