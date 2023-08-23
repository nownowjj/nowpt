package com.example.nowpt.mvc.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Table(name = "tb_friend")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="friend_seq", //시퀀스 제너레이터 이름
        sequenceName="friend_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Friend  extends BaseTime{
    @Id
    @Column(name = "friend_sn")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "friend_seq")
    private Long friendSn;

    @NotNull
    @Column(name = "memb_sn")
    private Long memberSn;

    @NotNull
    @Column(name = "friend_memb_sn")
    private Long friendMemberSn;

//    // 요청상태 WAIT,ACCEPT,REFUSE default = WAIT
//    @Enumerated(EnumType.STRING)
//    @Column(name = "request_status")
//    private RequestStatus requestStatus = RequestStatus.WAIT;

    @Column(name = "request_status", length = 20)
    @ColumnDefault("'WAIT'")
    private String requestStatus;
}
