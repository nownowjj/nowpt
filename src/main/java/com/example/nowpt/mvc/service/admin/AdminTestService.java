package com.example.nowpt.mvc.service.admin;

import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.repository.admin.AdminTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminTestService {
    private final AdminTestRepository adminTestRepository;

//    public Page<Member> getMembers(Pageable pageable) {
//
//
//    }
}
