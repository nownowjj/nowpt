package com.example.nowpt.mvc.service;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.security.JwtTokenProvider;
import com.example.nowpt.cmm.utils.EntityUtil;
import com.example.nowpt.mvc.dto.JoinDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.MemberLoginHst;
import com.example.nowpt.mvc.model.MemberMoney;
import com.example.nowpt.mvc.repository.member.MemberRepo;
import com.example.nowpt.mvc.repository.member_login_hst.MemberLoginHstRepo;
import com.example.nowpt.mvc.repository.member_money.MemberMoneyRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final ModelMapper mm;
    private final MemberRepo memRepo;
    private final MemberLoginHstRepo memLoginHstRepo;
    private final EntityUtil eu;
    private final MemberMoneyRepo mmRepo;
    private final PasswordEncoder pe;

    public String gettoken(String id, String pw, String ip, String sns) {

        Member mem = new Member();

        // 일반 로그인일 경우
        if (!(sns.equals("Y"))){
            // membId로 검증
             mem = memRepo.memberChkById(id);
             if(mem == null) return "fail";

             // 일반 로그인은 비밀번호 체크가 필요함
            if(! pe.matches(pw, mem.getPassword())) {
                return "peNot";
            }

        }
        // 소셜 로그인일 경우
        else{
            // 이메일로 검증
            mem = memRepo.memberChkById(id);
        }

        if(mem == null) {
            throw new RuntimeException("존재하지 않는 유저 입니다.");
        }



        if(! Cd.MEMBER_STTUS_OK.equals(mem.getMembSttusCd().getCodeValue())) {
            throw new RuntimeException("유저 상태가 정상이 아닙니다.");
        }

        mem.setLastLoginDt(LocalDateTime.now());
        memRepo.save(mem);

        MemberLoginHst mlg = new MemberLoginHst();
        mlg.setConnectIp(ip);
        mlg.setMemberSn(mem);
        memLoginHstRepo.save(mlg);
        return JwtTokenProvider.generateToken(id, pw, mem.getMembCls().getCodeValue() ,mem.getEmailAddr() , mem.getProfileImage(),mem.getMemberSn() );
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
            newMem.setSubscriptionMethod("EMAIL");
            return mmRepo.save(newMem);
        }
    }

    public Member findUserByEmailMethod(String userEmail) {
        return memRepo.findByMembId(userEmail);
    }

    @Cacheable("/allMember")
    public List<Member> findAllMember(){
        log.debug("request findAll Service");
        return memRepo.findAll();
    }


}
