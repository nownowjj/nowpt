package com.example.nowpt.mvc.common;

import org.springframework.data.jpa.repository.JpaRepository;

public class CommonUtils {
    public static void saveIfNullId(Long id, JpaRepository repository, Object entity) {
        if(id == null) {
            repository.save(entity);
        }
    }
}
