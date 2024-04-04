package com.example.nowpt.mvc.common;

import com.example.nowpt.mvc.model.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public abstract class RestControllerBase {

    /**
     * @return 유저 Sn
     */
    protected long getMemberSn(){
        return this.getMember().getMemberSn();
    }

    /**
     * @return authentication 객채에서 Principal 속성을 확인하여 사용자 정보 접근
     */
    protected Member getMember(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null ) {
            return  (Member) authentication.getPrincipal();
        }else throw new CustomException("유저 정보를 가져올 수 없음");
    }
}
