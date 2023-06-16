package com.example.nowpt.mvc.repository.member_login_hst;

import com.example.nowpt.mvc.model.MemberLoginHst;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberLoginHstCustomRepo {

    List<MemberLoginHst> selectAllLoginHst();
}
