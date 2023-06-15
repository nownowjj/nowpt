package com.example.nowpt.repository.product;

import com.example.nowpt.mvc.dto.ProductDto;
import com.example.nowpt.mvc.model.QProduct;
import com.example.nowpt.mvc.model.QProductLike;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.types.ExpressionUtils.count;

@Repository
@Slf4j
@RequiredArgsConstructor
public class ProductCustomRepoImpl implements ProductCustomRepo {

    private final JPAQueryFactory queryFactory;

    QProduct qProduct = QProduct.product;
    QProductLike qProductLike = QProductLike.productLike;
    @Override
    public List<ProductDto> findProductList(Long memberSn, boolean myProduct) {
        log.debug("조회 Sn : {}" , memberSn);
        log.debug("myProduct : {}" , myProduct);


        return queryFactory
               .select(Projections.fields(ProductDto.class,
                       ExpressionUtils.as(
                               JPAExpressions.select(count(qProductLike.productSn))
                                       .from(qProductLike)
                                       .where(qProductLike.useYn.eq("Y").and(qProductLike.productSn.eq(qProduct.productSn))),
                               "likeCount"),
                       qProduct.productSn,
                       new CaseBuilder()
                               .when(qProductLike.productLikeSn.isNull()).then(false)
                               .otherwise(true).as("active"),
                       qProduct.frstRegistMembSn.as("frstRegistMembSn"),
                       qProduct.keepYn.as("keepYn"),
                       qProduct.lastChangeDt.as("lastChangeDt"),
                       qProduct.lastChangeMembSn.as("lastChangeMembSn"),
                       qProduct.memberSn.memberSn.as("memberSn"),
                       qProduct.productDiscountRate.as("productDiscountRate"),
                       qProduct.productImage.as("productImage"),
                       qProduct.productIntroduce.as("productIntroduce"),
                       qProduct.productNm.as("productNm"),
                       qProduct.productPrice.as("productPrice"),
                       qProduct.remark.as("remark"),
                       qProduct.requestStatus.as("requestStatus"),
                       qProduct.useYn.as("useYn"),
                       qProduct.frstRegistDt.as("frstRegistDt")
               ))
               .from(qProduct)
               .leftJoin(qProductLike)
               .on(qProduct.productSn.eq(qProductLike.productSn).and(qProductLike.useYn.eq("Y").and(qProductLike.memberSn.eq(memberSn))))
                .where(eqMyProduct(memberSn,myProduct))
                .orderBy(qProduct.frstRegistDt.desc())
               .fetch();
    }

    // 일반적인 상품 조회와 좋아요한 상품 조회를 구분 할 수 있음
    private BooleanExpression eqMyProduct(long memberSn , boolean myProduct) {
        if(!myProduct) return null;
        return qProduct.useYn.eq("Y").and(qProductLike.memberSn.eq(memberSn));
    }
}
