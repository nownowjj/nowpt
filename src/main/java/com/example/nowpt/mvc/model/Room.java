package com.example.nowpt.mvc.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Table(name = "tb_room")
@Entity
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@SequenceGenerator(
        name="room_seq", //시퀀스 제너레이터 이름
        sequenceName="room_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Room extends Base {

    // Room PK
    @Id
    @Column(name = "room_sn")
    @GeneratedValue(
            strategy=GenerationType.SEQUENCE, //사용할 전략을 시퀀스로  선택
            generator="room_seq" //식별자 생성기를 설정해놓은  notice_seq 으로 설정
    )
    private Long roomSn;


    // 방 제목
    @Column(name = "room_title",length = 100, nullable = false)
    private String roomTitle;

    // 방 공개여부
    @Column(name = "open_yn", length = 1)
    @ColumnDefault("'Y'")
    private String openYn;

    // 방 비밀번호
    @Column(name = "room_pw",length = 100 )
    private String roomPw;

}
