package com.example.nowpt.mvc.repository.member_login_hst;

import com.example.nowpt.mvc.dto.LoginHstDto;
import com.example.nowpt.mvc.model.MemberLoginHst;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberLoginHstCustomRepo {

    // 로그인 이력 조회
    List<MemberLoginHst> selectAllLoginHst();
    // 로그인 이력 집계 조회
    Page<LoginHstDto> selectLoginStatistics(Pageable pageable);
}
