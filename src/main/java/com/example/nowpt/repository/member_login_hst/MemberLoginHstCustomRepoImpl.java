package com.example.nowpt.repository.member_login_hst;

import com.example.nowpt.mvc.model.MemberLoginHst;
import com.example.nowpt.mvc.model.QMemberLoginHst;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MemberLoginHstCustomRepoImpl implements MemberLoginHstCustomRepo{
	@Autowired private JPAQueryFactory qf;

	// 모든 로그인 기록

	/**
	 * fecth() = 리스트로 결과를 반환. 데이터가 없으면 빈 리스트를 반환.
	 * fetchOne() 단건을 조회할 때 사용. 결과가 없으면 null , 결과가 둘 이상일 경우에는 NonUniqueResultException 발생
	 * @return
	 */
	@Override
	public List<MemberLoginHst> selectAllLoginHst(){
		QMemberLoginHst qMemberLoginHst = QMemberLoginHst.memberLoginHst;
		return
//				qf.selectFrom(qMemberLoginHst)
				qf.select(qMemberLoginHst)
						.from(qMemberLoginHst)
						.orderBy(qMemberLoginHst.frstRegistDt.desc())
						.limit(10)
				  .fetch();
	}


}
