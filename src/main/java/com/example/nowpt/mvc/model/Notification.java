package com.example.nowpt.mvc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Objects;

@Table(name = "tb_notification")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@DynamicInsert
@DynamicUpdate
@SequenceGenerator(
        name="notification_seq", //시퀀스 제너레이터 이름
        sequenceName="notification_seq", //시퀀스 이름
        initialValue=1, //시작값
        allocationSize=1 //메모리를 통해 할당할 범위 사이즈
)
public class Notification extends BaseTime {
    @Id
    @Column(name = "notification_sn")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_seq")
    private Long notificationSn;

    @Column(name = "target_memb_sn")
    private Long targetMemberSn;

    @Column(name = "notification_title", nullable = false)
    private String notificationTitle;

    @Column(name = "notification_content", nullable = false)
    private String notificationContent;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Notification)) return false;
        Notification other = (Notification) o;
        return notificationSn != null && notificationSn.equals(other.getNotificationSn());
    }

    @Override
    public int hashCode() {
        return Objects.hash(notificationSn);
    }
}
