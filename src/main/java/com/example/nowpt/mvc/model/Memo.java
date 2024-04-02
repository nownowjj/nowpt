package com.example.nowpt.mvc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Table(name = "tb_memo")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="memo_seq", //시퀀스 제너레이터 이름
        sequenceName="memo_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Memo extends BaseTime {
    @Id
    @Column(name = "memo_sn")
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "memo_seq")
    private Long memoSn;

    @Column(name = "title" , length = 100)
    private String Title;

    @NotNull
    @Column(name = "content" , length = 2000)
    private String content;

    @NotNull
    @Column(name = "memb_sn")
    private Long memberSn;
}
