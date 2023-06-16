package com.example.nowpt.mvc.repository.member;

import com.example.nowpt.mvc.model.Member;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberCustomRepo {
	Member memberChkById(String id);


	Member memberChkByEmail(String email);
}
