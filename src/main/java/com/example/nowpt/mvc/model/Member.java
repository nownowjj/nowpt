package com.example.nowpt.mvc.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tb_member2")
//, indexes = @Index(columnList = "memb_sn")
@SequenceGenerator(name = "member_seq", allocationSize = 1, initialValue = 1, sequenceName = "member_seq")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
@Entity

@Inheritance(strategy = InheritanceType.JOINED)
//@DiscriminatorColumn(name = "DTYPE")
public class Member extends Base {
    //회원번호
    @Id
    @Column(name = "memb_sn")
    @GeneratedValue(generator = "member_seq", strategy = GenerationType.SEQUENCE)
    private Long memberSn;
    //회원구분

    //회원ID
    @Column(name = "memb_id", length = 12, nullable = false, unique = true)
    private String membId;

    //회원PW
    @Column(name = "memb_pw", length = 200, nullable = false)
    private String membPw;

    //회원이름
    @Column(name = "memb_nm", length = 100, nullable = false)
    private String membNm;

    //휴대폰번호
    @Column(name = "mobile_no", length = 20)
    private String mobileNo;

    //이메일주소
    @Column(name = "email_addr", length = 100)
    private String emailAddr;

    //우편번호
    @Column(name = "zip_cd", length = 6)
    private String zipCd;

    //우편번호주소
    @Column(name = "zip_addr", length = 150)
    private String zipAddr;

    //상세주소
    @Column(name = "detail_addr", length = 150)
    private String detailAddr;

    //최종로그인일시
    @Column(name = "last_login_dtm", length = 14)
    private String lastLoginDtm;

    //-------------------------------------------------------
    //-------------------------------------------------------

}

