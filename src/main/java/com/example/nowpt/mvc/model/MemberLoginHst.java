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
@Table(name = "tb_memb_login_hst")
//, indexes = @Index(columnList = "login_sn")
@SequenceGenerator(name = "memLoginHst_seq", allocationSize = 1, initialValue = 1, sequenceName = "memLoginHst_seq")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
@Entity
public class MemberLoginHst extends Base{
    @Id
    @GeneratedValue(generator = "memLoginHst_seq", strategy = GenerationType.SEQUENCE)@Column(name = "login_sn")
    private Long loginSn;

    @ManyToOne
    @JoinColumn(name = "member_sn")
    private Member memberSn;

    @Column(name = "connect_ip")
    private String connectIp;
}
