package com.example.nowpt.mvc.model;

import com.sun.istack.NotNull;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "tb_product")
@Entity
@Data
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="product_seq", //시퀀스 제너레이터 이름
        sequenceName="product_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Product extends Base{

    // 상품 Pk
    @Id
    @Column(name = "product_sn")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq")
    private Long productSn;

    // 상품 등록자
    @ManyToOne
    @JoinColumn(name = "memb_sn")
    @NotNull
    private Member memberSn;

    // 상품명
    @Column(name = "product_nm" , length = 200)
    @NotNull
    private String productNm;

    // 상품 설명
    @Column(name = "product_introduce" , length = 500)
    @NotNull
    private String productIntroduce;

    // 상품 가격
    @Column(name = "product_price", length = 200 ,nullable = false)
    @NotNull
    private int productPrice;

    // 상품 할인율
    @Column(name = "product_discount_rate")
    @ColumnDefault("0")
    private int productDiscountRate;

//    // 상품 보관을 요청할 시 상품 보관 시작시간
//    @Column(name = "keep_start_time")
//    private LocalDateTime keepStartTime;
//
//    // 상품 보관을 요청할 시 상품 보관 종료시간
//    @Column(name = "keep_end_time")
//    private LocalDateTime keepEndTime;
//
//    // 상품 보관 중단을 요청한 시간
//    @Column(name = "keep_stop_time")
//    private LocalDateTime keepStopTime;

    // 상품 보관 여부
    @Column(name = "keep_yn", length = 1)
    @ColumnDefault("'N'")
    private String keepYn;

    // 비고
    @Column(name = "remark" , length = 500)
    private String remark;

    // 요청상태 BEFORE,WAIT,ACCEPT,REFUSE default = BEFORE
    @Enumerated(EnumType.STRING)
    private RequestStatus requestStatus = RequestStatus.BEFORE;

    // 상품 이미지
    @Column(name = "product_image" , length = 255 )
    private String productImage;






}
