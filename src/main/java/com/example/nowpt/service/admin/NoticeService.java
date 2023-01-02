package com.example.nowpt.service.admin;

import com.example.nowpt.mvc.dto.NoticeDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Notice;
import com.example.nowpt.repository.notice.NoticeRepo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class NoticeService {
    @Autowired private NoticeRepo noticeRepo;
    @Autowired private ModelMapper modelMapper;
    /**
     * @param member
     * @param noticeDto
     * @return 공지사항 등록
     */
    public Notice insertNotice(Member member, NoticeDto noticeDto) {
//        Notice newNotice = new Notice();
        Notice newNotice = modelMapper.map(noticeDto,Notice.class);
        newNotice.setMemberSn(member);
        newNotice.setFrstRegistMembSn(member.getMemberSn());
        log.debug("newNotice : {}" , newNotice);
        return noticeRepo.save(newNotice);
    }


    public Page<Notice> selectNotice(Pageable pageable) {
//        log.debug("pagingCheck : {}",noticeRepo.selectNoticePaging(pageable));
        return noticeRepo.selectNoticePaging(pageable);
    }
}
