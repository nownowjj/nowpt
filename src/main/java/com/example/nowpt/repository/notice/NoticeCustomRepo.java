package com.example.nowpt.repository.notice;

import com.example.nowpt.mvc.model.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeCustomRepo {
    /**
     *
     * @param pageable
     * @return 공지사항 페이징 처리
     */
    Page<Notice> selectNoticePaging(Pageable pageable);
}
