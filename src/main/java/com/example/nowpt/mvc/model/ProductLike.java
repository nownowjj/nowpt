package com.example.nowpt.mvc.model;


import com.sun.istack.NotNull;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tb_product_like")
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="product_like_seq", //시퀀스 제너레이터 이름
        sequenceName="product_like_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class ProductLike extends BaseTime {

    // 상품 Pk
    @Id
    @Column(name = "product_like_sn")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_like_seq")
    private Long productLikeSn;

    @NotNull
    @Column(name = "member_sn")
    private long memberSn;

    @NotNull
    @Column(name = "product_sn")
    private long productSn;
}
