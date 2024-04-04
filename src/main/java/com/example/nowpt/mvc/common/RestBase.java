package com.example.nowpt.mvc.common;

import com.example.nowpt.mvc.model.MbrPrinciple;
import org.springframework.security.core.context.SecurityContextHolder;

public abstract class RestBase {

    protected long getMemberSn(){
        MbrPrinciple entt =  (MbrPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return entt.getMbrSn();
    }
}
