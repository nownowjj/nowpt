package com.example.nowpt.repository.member_login_hst;

import com.example.nowpt.mvc.model.QMemberLoginHst;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static com.example.nowpt.mvc.model.QMemberLoginHst.memberLoginHst;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberLoginHstCustomRepoImplTest {

    @Autowired
    private JPAQueryFactory queryFactory;

    @Test
    public void simpe_test() {
//            QMemberLoginHst qMemberLoginHst = QMemberLoginHst.memberLoginHst;
//		QMember qMember = QMember.member;

            List<Tuple> fetch = queryFactory
                    .select(
                            memberLoginHst.memberSn,
                            memberLoginHst.frstRegistDt.max()
                    )
                    .from(memberLoginHst)
                    .groupBy(memberLoginHst.memberSn)
                    .fetch();

            for (Tuple tuple : fetch) {
                System.out.println("tuple = " + tuple);
            }
        }
}