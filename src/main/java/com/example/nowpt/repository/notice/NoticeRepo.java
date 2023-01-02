package com.example.nowpt.repository.notice;

import com.example.nowpt.mvc.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepo extends JpaRepository<Notice,Long> ,NoticeCustomRepo{
}
