package com.example.nowpt.repository.member;

import com.example.nowpt.mvc.model.Member;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberCustomRepo {
	Member memberChkById(String id);

}
