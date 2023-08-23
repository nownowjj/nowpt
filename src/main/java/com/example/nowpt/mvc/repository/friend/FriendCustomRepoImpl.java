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
    public List<FriendDto> selectMyFriend(Long memberSn) {
        return queryFactory
                .select(Projections.fields(FriendDto.class,
                    qFriend.friendSn.as("friendSn"),
                        qFriend.friendMemberSn.as("friendMemberSn"),
                        qMember.membNm.as("friendNm"),
                        qFriend.frstRegistDt.as("frstRegistDt"),
                        qMember.profileImage.as("friendProfile"),
                        qFriend.requestStatus.as("requestStatus")
                ))
                .from(qFriend)
                .leftJoin(qMember)
                .on(qFriend.friendMemberSn.eq(qMember.memberSn))
                .where(qFriend.memberSn.eq(memberSn).and(qFriend.requestStatus.eq("ACCEPT")))
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
                        qMember.profileImage.as("friendProfile"),
                        qFriend.requestStatus.as("requestStatus")
                ))
                .from(qFriend)
                .leftJoin(qMember)
                .on(qFriend.memberSn.eq(qMember.memberSn))
                .where(
                        qFriend.friendMemberSn.eq(memberSn)
                                .and(qFriend.requestStatus.eq("WAIT"))
                )
                .orderBy(qFriend.frstRegistDt.desc())
                .fetch();
    }


    @Override
    public List<FriendDto> selectRecommendFriendList(Long memberSn) {
        log.debug("tqqw");
        return queryFactory
                .select(Projections.fields(FriendDto.class,
                        qMember.memberSn.as("friendMemberSn"),
                        qMember.membNm.as("friendNm"),
                        qMember.frstRegistDt.as("frstRegistDt"),
                        qMember.profileImage.as("friendProfile"),
                        qFriend.requestStatus.as("requestStatus")
                        ))
                .from(qMember)
                .leftJoin(qFriend)
                .on(qMember.memberSn.eq(qFriend.friendMemberSn).and(qFriend.memberSn.eq(memberSn)))
                .where(
                        qMember.useYn.eq("Y").and(qMember.memberSn.ne(memberSn)).and
                        ((qFriend.requestStatus.eq("REFUSE")).or(qFriend.requestStatus.isNull()))
                )
                .fetch();
    }

    @Override
    public List<FriendDto> selectMyRequestWaitFriendList(Long memberSn) {
        return queryFactory
                .select(Projections.fields(FriendDto.class,
                        qFriend.friendSn.as("friendSn"),
                        qFriend.friendMemberSn.as("friendMemberSn"),
                        qMember.membNm.as("friendNm"),
                        qFriend.frstRegistDt.as("frstRegistDt"),
                        qMember.profileImage.as("friendProfile"),
                        qFriend.requestStatus.as("requestStatus")
                ))
                .from(qFriend)
                .leftJoin(qMember)
                .on(qFriend.friendMemberSn.eq(qMember.memberSn))
                .where(
                        qFriend.memberSn.eq(memberSn)
                                .and(qFriend.requestStatus.eq("WAIT"))
                )
                .orderBy(qFriend.frstRegistDt.desc())
                .fetch();
    }

}
