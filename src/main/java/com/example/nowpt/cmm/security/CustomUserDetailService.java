package com.example.nowpt.cmm.security;

import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.repository.member.MemberRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
@Slf4j
public class CustomUserDetailService implements UserDetailsService{
	@Autowired private MemberRepo memRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Member member = memRepo.findByMembId(username);
//		Member member = memRepo.findByMembIdOrEmailAddr(username);

		if(member == null) throw new UsernameNotFoundException("유저가 존재하지 않습니다.");
//		log.debug("해당 username getUsername : {}",member.getUsername());
//		log.debug("해당 userpw : {}",member.getPassword());

		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(member.getMembCls().getCodeValue()));
//		log.info(new SimpleGrantedAuthority(member.getMembCls().getCodeValue())+" 권한정보");
		member.setAuthorities(authorities);
//		log.debug("Member auth : {}",member.getAuthorities());
		return member;
	}
}
