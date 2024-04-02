package com.example.nowpt.mvc.repository.member;

import com.example.nowpt.mvc.dto.MemberDto;
import com.example.nowpt.mvc.model.Member;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberCustomRepo {
	Member memberChkById(String id);


	Member memberChkByEmail(String email);

	List<MemberDto> selectAllMember();
}
