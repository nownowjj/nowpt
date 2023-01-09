package com.example.nowpt.mvc.model;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "tb_reservation")
@Entity
@Data
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="reservation_seq", //시퀀스 제너레이터 이름
        sequenceName="reservation_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Reservation extends Base{

    // 예약 PK
    @Id
    @Column(name = "reservation_sn")
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "reservation_seq"
    )
    private Long reservationSn;

    // 예약자
    @ManyToOne
    @JoinColumn(name = "memb_sn")
    private Member memberSn;

    // 회의실 명
    @Column(name = "meeting_room",length = 200)
    private String meetingRoom;
    // 사용목적
    @Column(name = "reservation_purpose", length = 200)
    private String purpose;

    @Column(name = "use_day",nullable = false)
    private LocalDate useDay;

    @Column(name = "use_start_time",nullable = false)
    private LocalDateTime useStartTime;

    @Column(name = "use_end_time",nullable = false)
    private LocalDateTime useEndTime;

}
