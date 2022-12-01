package com.example.nowpt.repository.member;

import com.example.nowpt.mvc.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepo extends JpaRepository<Member, Long>, MemberCustomRepo{
	Member findByMembId(String membId);
	

	boolean existsByMembId(String membId);
	
	
}
