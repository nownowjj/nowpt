package com.example.nowpt.mvc.model;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@NoArgsConstructor
@Data
@Table(name = "tb_calendar")
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="calendar_seq", //시퀀스 제너레이터 이름
        sequenceName="calendar_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Calendar extends BaseTime {

    // 캘린더 sn
    @Id
    @Column(name = "calendar_sn")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "calendar_seq")
    private Long calendarSn;

    @NotBlank
    @Column(name = "record_date" , length = 8)
    private String recordDate;

    @NotNull
    @Column(name = "memb_sn")
    private long memberSn;

    @NotBlank
    @Column(name = "title" , length = 100 )
    private String title;

    @NotBlank
    @Column(name = "content" , length = 2000)
    private String content;

    @Column(name = "import_yn", columnDefinition = "NUMBER(1,0) DEFAULT 0")
    private boolean importYn;

    @Column(name = "image_url" , length = 200)
    private String imageUrl;

//    @NotNull
//    @Builder.Default
//    @ColumnDefault("false")
//    private Boolean columnName = false;
}