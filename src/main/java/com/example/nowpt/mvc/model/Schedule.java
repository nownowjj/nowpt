package com.example.nowpt.mvc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Table(name = "tb_schedule")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="schedule_seq", //시퀀스 제너레이터 이름
        sequenceName="schedule_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Schedule extends BaseTime {
    @Id
    @Column(name = "schedule_sn")
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "schedule_seq")
    private Long scheduleSn;

    @ManyToOne
    @JoinColumn(name = "memb_sn")
    private Member memberSn;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "color")
    private String color;

    @NotNull
    @Column(name = "start_date" , length = 8)
    private String startDate;

    @NotNull
    @Column(name = "end_date" , length = 8)
    private String endDate;
}
