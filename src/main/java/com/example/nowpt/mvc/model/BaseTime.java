package com.example.nowpt.mvc.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
//@Setter
//@MappedSuperclass 어노테이션을 사용함으로써 JPA Entity 클래스들이 BaseTime class를 상속할 경우 BaseTime class의 필드인 createdDate, modifiedDate를 인식하도록 합니다.
@MappedSuperclass

@EntityListeners(AuditingEntityListener.class)
public class BaseTime {
	@Column(name = "use_yn", length = 1)
	@ColumnDefault("'Y'")
	private String useYn;
	
	// Entity 생성될 때 생성
	@CreatedDate
	@Column(name = "frst_regist_dt", nullable = false)
//	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
	private LocalDateTime frstRegistDt;
	
	// Entity 수정 됐을 때
	@LastModifiedDate
	@Column(name = "last_change_dt", nullable = false)
	private LocalDateTime lastChangeDt;










}
