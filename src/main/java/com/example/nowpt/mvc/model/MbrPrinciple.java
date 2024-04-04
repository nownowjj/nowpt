package com.example.nowpt.mvc.model;

import com.example.nowpt.mvc.vo.MemberVo;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * UserDetail
 * 사용자 정보 저장하기
 * @author jiwon
 *
 */
public class MbrPrinciple extends MemberVo implements UserDetails {
	
	private static final long serialVersionUID = 1L;
	
	public MbrPrinciple(long mbrSn, String mbrNm, String mbrId, String mbrTy, Long nmeSn, String mbrCiYn, String mbrImg, String mbrEmailCrtfcYn, String mbrEmail, String filtering,
                        Collection<? extends GrantedAuthority> authorities, List<Map<String,Object>> role, List<Map<String,Object>> myGrp, int exp, String inum, String publicKeyYn, String userCiHash,
                        String snsInum, String emailAdresId, String unityUserYn, String userSttusCode) {
		this.setMbrSn(mbrSn);
		this.setMbrNm(mbrNm);
		this.setMbrId(mbrId);
		this.setMbrTy(mbrTy);
		if(nmeSn != null) this.setNmeSn(nmeSn);
		if(mbrCiYn != null) this.setMbrCiYn(mbrCiYn);
		if(mbrImg != null) this.setMbrImg(mbrImg);
		this.setMbrEmailCrtfcYn(mbrEmailCrtfcYn);
		this.setMbrEmail(mbrEmail);
		if(filtering !=null ) this.setFiltering(filtering);
		this.setAuthorities(authorities);
		this.setRole(role);
		this.setMyGrp(myGrp);
		this.setExp(exp);
		this.setInum(inum);
		this.setPublicKeyYn(publicKeyYn);
		this.setUserCiHash(userCiHash);

		this.setSnsInum(snsInum);
		this.setEmailAdresId(emailAdresId);
		this.setUnityUserYn(unityUserYn);
		this.setUserSttusCode(userSttusCode);
	}

	public static MbrPrinciple buildPayload(Claims info) {
		return build(info);
	}
	
	public static MbrPrinciple buildUserDb(Map<String, Object> info) {
		return build(info);
	}
	
	@SuppressWarnings("unchecked")
	public static MbrPrinciple build(Map<String,Object> info) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>(); 
//		List<String> authorities_string = (List<String>) info.get("authorities");
//		for(String authority : authorities_string) {
//			authorities.add(new SimpleGrantedAuthority(authority));
//		}
		
		long mbrSn = Long.parseLong(info.get("mbrSn").toString());
		Object nmeSnObj = info.get("nmeSn");
		Long nmeSn = nmeSnObj == null ? null : Long.parseLong(nmeSnObj.toString());
		int exp = info.get("exp") == null ? 0 : (int)info.get("exp");
		return new MbrPrinciple(mbrSn, (String)info.get("mbrNm"), (String)info.get("mbrId"),
				(String)info.get("mbrTy"), nmeSn, (String)info.get("mbrCiYn"),
				(String)info.get("mbrImg"), (String)info.get("mbrEmailCrtfcYn"),
				(String)info.get("mbrEmail"), (String)info.get("filtering"),
				authorities,
				(List<Map<String, Object>>) info.get("role"), (List<Map<String, Object>>) info.get("myGrp"),
				exp, (String) info.get("inum"),
				(String)info.get("publicKeyYn"), (String)info.get("userCiHash"),
				(String) info.get("snsInum"), (String)info.get("emailAdresId"), (String)info.get("unityUserYn"),
				(String)info.get("userSttusCode"));
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return false;
	}

}
