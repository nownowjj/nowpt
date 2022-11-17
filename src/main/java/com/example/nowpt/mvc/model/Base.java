package com.example.nowpt.mvc.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

@Setter
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Base extends BaseTime {
	@CreatedBy
	@Column(name = "frst_regist_memb_sn")
	private Long frstRegistMembSn;
	
	@LastModifiedBy
	@Column(name = "last_change_memb_sn")
	private Long lastChangeMembSn;
}
