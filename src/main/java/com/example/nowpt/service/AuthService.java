package com.example.nowpt.service;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.security.JwtTokenProvider;
import com.example.nowpt.cmm.utils.EntityUtil;
import com.example.nowpt.mvc.dto.JoinDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.MemberLoginHst;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.repository.member.MemberRepo;
import com.example.nowpt.repository.member_login_hst.MemberLoginHstRepo;
import com.example.nowpt.repository.member_money.MemberMoneyRepo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class AuthService {
    @Autowired private ModelMapper mm;
    @Autowired private MemberRepo memRepo;
    @Autowired private MemberLoginHstRepo memLoginHstRepo;
    @Autowired private EntityUtil eu;
    @Autowired private MemberMoneyRepo mmRepo;

    @Autowired private PasswordEncoder pe;

    public String gettoken(String id, String pw, String ip) {
        Member mem = memRepo.memberChkById(id);

        if(mem == null) {
            throw new RuntimeException("존재하지 않는 유저 입니다.");
        }

        if(! pe.matches(pw, mem.getPassword())) {
            throw new RuntimeException("비밀번호가 틀립니다.");
        }

        if(! Cd.MEMBER_STTUS_OK.equals(mem.getMembSttusCd().getCodeValue())) {
            throw new RuntimeException("유저 상태가 정상이 아닙니다.");
        }

        MemberLoginHst mlg = new MemberLoginHst();
        mlg.setConnectIp(ip);
        mlg.setMemberSn(mem);
        memLoginHstRepo.save(mlg);
        return JwtTokenProvider.generateToken(id, pw, mem.getMembCls().getCodeValue());
    }

    public MemberMoney userJoin(JoinDto joinDto) {
        Member memChk = memRepo.memberChkById(joinDto.getMembId());
        if(memChk != null) {
            if(Cd.MEMBER_STTUS_OK.equals(memChk.getMembSttusCd().getCodeValue())) {
                throw new RuntimeException("이미 존재하는 아이디 입니다.");
            } else {
                memChk.setMembSttusCd(eu.getMemberSttusCmm(Cd.MEMBER_STTUS_OK));
                return (MemberMoney) memRepo.save(memChk);
            }
        } else {
            log.debug("회원가입 진행 {}",joinDto);

            MemberMoney newMem = mm.map(joinDto, MemberMoney.class);
            newMem.setMoneyBlce(0L);
            newMem.setMembPw(pe.encode(newMem.getPassword()));
            newMem.setMembCls(eu.getMemberTyCmm(Cd.MEMBER_TY_USER));
            newMem.setMembSttusCd(eu.getMemberSttusCmm(Cd.MEMBER_STTUS_OK));
            return mmRepo.save(newMem);
        }
    }
}
