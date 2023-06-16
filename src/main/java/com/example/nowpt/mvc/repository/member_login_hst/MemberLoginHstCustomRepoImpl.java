package com.example.nowpt.mvc.repository.member_login_hst;

import com.example.nowpt.mvc.dto.LoginHstDto;
import com.example.nowpt.mvc.model.MemberLoginHst;
import com.example.nowpt.mvc.model.QMemberLoginHst;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class MemberLoginHstCustomRepoImpl implements MemberLoginHstCustomRepo{
	private final JPAQueryFactory queryFactory;
	QMemberLoginHst qMemberLoginHst = QMemberLoginHst.memberLoginHst;
	QMemberLoginHst subQMemberLoginHst = new QMemberLoginHst("subQMemberLoginHst");
	// 모든 로그인 기록
	/**
	 * fecth() = 리스트로 결과를 반환. 데이터가 없으면 빈 리스트를 반환.
	 * fetchOne() 단건을 조회할 때 사용. 결과가 없으면 null , 결과가 둘 이상일 경우에는 NonUniqueResultException 발생
	 *
	 * @return
	 */
	@Override
	public List<MemberLoginHst> selectAllLoginHst(){
		return
				queryFactory
						.selectFrom(qMemberLoginHst)
						.orderBy(qMemberLoginHst.frstRegistDt.desc())
						.limit(10)
				  .fetch();
	}

	// 로그인 이력 집계 조회
	@Override
	public Page<LoginHstDto> selectLoginStatistics(Pageable pageable) {
		// 로그인 이력 테이블의 로그인 일시는 timestamp 이므로 일자별로 집계를 해야 해서 date format을 함
		StringTemplate formattedDate2 = Expressions.stringTemplate(
				"TO_CHAR(TRUNC({0}), 'yyyy-mm-dd')",
				qMemberLoginHst.frstRegistDt
		);

		// 일자별 누적 로그인 횟수를 집계 하려면 원 쿼리에서 추출된 format 된 일자를 subQ 테이블 where 조건에 넣는다 따라서 subQ 테이블이 필요함
		SubQueryExpression<Long> subqueryExpression = JPAExpressions
				.select(subQMemberLoginHst.frstRegistDt.count())
				.from(subQMemberLoginHst)
				.where(Expressions.stringTemplate("TO_CHAR(TRUNC({0}),'yyyy-mm-dd')", subQMemberLoginHst.frstRegistDt)
						.loe(formattedDate2)
				);


		JPAQuery<LoginHstDto> query = queryFactory
				.select(Projections.constructor(LoginHstDto.class,
						formattedDate2.as("data_one"),
						qMemberLoginHst.frstRegistDt.count().as("data_two"),
						qMemberLoginHst.memberSn.countDistinct().as("data_three"),
						new CaseBuilder()
								.when(ExpressionUtils.isNull(subqueryExpression))
								.then(Expressions.constant(0L))
								.otherwise(subqueryExpression).as("data_four")
				))
				.from(qMemberLoginHst)
				.groupBy(formattedDate2)
				.orderBy(formattedDate2.desc());

		long totalCount = query.fetchCount();
		List<LoginHstDto> results = query
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetch();

		log.debug("결과 results.size : {}  , 요청 paging : {}  " , totalCount , pageable);
		return new PageImpl<>(results , pageable ,totalCount);
	}
}
