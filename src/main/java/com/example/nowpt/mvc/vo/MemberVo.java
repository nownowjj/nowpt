package com.example.nowpt.mvc.vo;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * UserDetail 변수 표준화
 * @author jiwon
 *
 */
@Data
public class MemberVo {
	private long mbrSn;
	private String mbrNm;
	private String mbrId;
	private String mbrTy;
	private long nmeSn;
	private String mbrCiYn;
	private String mbrImg;
	private String mbrEmailCrtfcYn;
	private String mbrEmail;
	private String filtering;
	private Collection <? extends GrantedAuthority> authorities;
	private List<Map<String, Object>> role;
	private List<Map<String, Object>> myGrp;
	private int exp;
	private String inum;
	private String publicKeyYn;
	private String userCiHash;
	private String snsInum;
	private String emailAdresId;
	private String unityUserYn;
	private String userSttusCode;
}