package com.example.nowpt.repository.member_login_hst;

import com.example.nowpt.mvc.model.MemberLoginHst;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberLoginHstRepo extends JpaRepository<MemberLoginHst, Long>, MemberLoginHstCustomRepo{

}
