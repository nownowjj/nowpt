package com.example.nowpt.repository.member;

import com.example.nowpt.mvc.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepo extends JpaRepository<Member, Long>, MemberCustomRepo{
	Member findByMembId(String membId);

//	Member findByMembIdOrEmailAddr(String membId, String emailAddr);
	

	boolean existsByMembId(String membId);


	Member findByMemberSn(Long membSn);

//	Member findByMembEmailAddr(String emailAddr);


	// email 조회 추가
//	Member findUsersByEmail(String userEmail);
}
