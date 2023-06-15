package com.example.nowpt.mvc.model;

import com.example.nowpt.cmm.code.Cd;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tb_member")
//, indexes = @Index(columnList = "memb_sn")
@SequenceGenerator(name = "member_seq", allocationSize = 1, initialValue = 1, sequenceName = "member_seq")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
//@EqualsAndHashCode(callSuper=false)
//@DiscriminatorColumn(name = "DTYPE")
public class Member extends Base implements UserDetails{
    private static final long serialVersionUID = 1L;

    //회원번호
    @Id@Column(name = "memb_sn")@GeneratedValue(generator = "member_seq", strategy = GenerationType.SEQUENCE)
    private Long memberSn;

    //회원구분
    @OneToOne@JoinColumn(name = Cd.CODE_ID_MEMBER_TY)
    private CmmnCodeDetail membCls;

    //회원상태
    @OneToOne@JoinColumn(name = Cd.CODE_ID_MEMBER_STTUS)
    private CmmnCodeDetail membSttusCd;

    //회원ID
    @Column(name = "memb_id", length = 100, nullable = false, unique = true)
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
    @Column(name = "email_addr", length = 100, nullable = false,unique = true)
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
    @Column(name = "last_login_dt")
    private LocalDateTime lastLoginDt;

    @Column(name = "profile_image" , length = 255 )
    private String profileImage;

    @Column(name = "identity_verification", length = 1)
    @ColumnDefault("'N'")
    private String identityVerification;

    @Column(name = "subscription_method",length = 20)
    private String subscriptionMethod;

    @Column(name = "memb_ncm" , length = 30 , unique = true) // 23.06.15 닉네임 추가
    private String membNcm;

    //-------------------------------------------------------
    //SecurityConfig
    //-------------------------------------------------------
    @Transient
    private Collection<SimpleGrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.membPw;
    }

    @Override
    public String getUsername() {//ID? SN?
        return String.valueOf(this.membId);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

//    public Member(){
//
//    }
}


