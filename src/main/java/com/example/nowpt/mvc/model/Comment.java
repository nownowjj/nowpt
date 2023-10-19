package com.example.nowpt.mvc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Table(name = "tb_comment")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="comment_seq", //시퀀스 제너레이터 이름
        sequenceName="comment_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Comment extends BaseTime{
    @Id
    @Column(name = "comment_sn")
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "comment_seq")
    private Long commentSn;

    @NotNull
    @Column(name = "calendar_sn")
    private Long calendarSn;

    @NotNull
    @Column(name ="comment_content", length = 200)
    private String commentContent;

    // 작성자 Sn
    @ManyToOne
    @JoinColumn(name = "memb_sn")
    private Member memberSn;
}
