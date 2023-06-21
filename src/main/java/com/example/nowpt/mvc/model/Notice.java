package com.example.nowpt.mvc.model;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Table(name = "tb_notice")
@Entity
@Data
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="notice_seq", //시퀀스 제너레이터 이름
        sequenceName="notice_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Notice extends Base {

    // 공지사항 PK
    @Id
    @Column(name = "notice_sn")
    @GeneratedValue(
            strategy=GenerationType.SEQUENCE, //사용할 전략을 시퀀스로  선택
            generator="notice_seq" //식별자 생성기를 설정해놓은  notice_seq 으로 설정
    )
    private Long noticeSn;

    // 작성자 Sn
    @ManyToOne
    @JoinColumn(name = "memb_sn")
    private Member memberSn;

    // 공지사항 제목
    @Column(name = "notice_title",length = 200 , nullable = false)
    private String noticeTitle;

    // 공지사항 내용
    @Column(name = "notice_content",length = 2000 , nullable = false)
    private String noticeContent;


}
