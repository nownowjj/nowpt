package com.example.nowpt.mvc.repository.comment;

import com.example.nowpt.mvc.dto.CommentDto;
import com.example.nowpt.mvc.model.QComment;
import com.example.nowpt.mvc.model.QMember;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class CommentCustomRepoImpl implements CommentCustomRepo {
    private final JPAQueryFactory queryFactory;
    QComment qComment = QComment.comment;

    @Override
    public List<CommentDto> selectComments(long calendarSn) {
        QMember qMember = QMember.member;
        return queryFactory
                .select(Projections.fields(CommentDto.class,
                        qMember.profileImage.as("profileImage"),
                        qMember.membNm.as("membNm"),
                        qComment.frstRegistDt.as("frstRegistDt"),
                        qComment.commentContent.as("commentContent"),
                        qComment.commentSn.as("commentSn"),
                        qComment.memberSn.memberSn.as("membSn"),
                        qComment.useYn.as("useYn"),
                        qComment.calendarSn.as("calendarSn")
                ))
                .from(qComment)
                .innerJoin(qMember)
                .on(qComment.memberSn.eq(qMember))
                .where(qComment.useYn.eq("Y").and(qComment.calendarSn.eq(calendarSn)))
                .orderBy(qComment.frstRegistDt.desc())
                .fetch();
    }

    @Override
    @Transactional
    public long deleteComment(long commentSn) {
        return queryFactory
                .update(qComment)
                .set(qComment.useYn,"N")
                .where(qComment.commentSn.eq(commentSn))
                .execute();
    }
}
