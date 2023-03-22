package com.example.nowpt.mvc.model;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Table(name = "tb_room_request")
@Entity
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="room_request_seq", //시퀀스 제너레이터 이름
        sequenceName="room_request_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class RoomRequest extends Base {

    // Room PK
    @Id
    @Column(name = "room_request_sn")
    @GeneratedValue(
            strategy=GenerationType.SEQUENCE, //사용할 전략을 시퀀스로  선택
            generator="room_request _seq" //식별자 생성기를 설정해놓은  notice_seq 으로 설정
    )
    private Long roomRequestSn;


    @ManyToOne
    @JoinColumn(name = "room_sn")
    private Room roomSn;


    // 예약자
    @ManyToOne
    @JoinColumn(name = "memb_sn")
    private Member memberSn;


    // 방장여부 Y.N
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.WAIT;

}
