package com.example.nowpt.mvc.service.admin;

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


    /**
     *
     * @param pageable
     * @return 공지사항 조회
     */
    public Page<Notice> selectNotice(Pageable pageable) {
//        log.debug("pagingCheck : {}",noticeRepo.selectNoticePaging(pageable));
        return noticeRepo.selectNoticePaging(pageable);
    }

    /**
     * @param noticeSn
     * @param noticeDto
     * @param memberSn
     * @return 공지사항 수정
     */
    public Notice patchNotice(Long noticeSn, NoticeDto noticeDto, Long memberSn) {
        // Sn으로 공지사항 조회
        Notice notice = noticeRepo.findByNoticeSn(noticeSn);

        // Sn 조회 오류시 Exception 발생
        if(notice == null) {
            throw new RuntimeException("수정에 실패하였습니다.");
        }

        // 새로운 데이터로 Set
        if(noticeDto.getNoticeTitle() != null){
            notice.setNoticeTitle(noticeDto.getNoticeTitle());
        }
        if(noticeDto.getNoticeContent() != null){
            notice.setNoticeContent(noticeDto.getNoticeContent());
        }

        notice.setLastChangeMembSn(memberSn);
        return noticeRepo.save(notice);
    }

//    public Notice deleteNotice(Long noticeSn) {
//        Notice notice = noticeRepo.findByNoticeSn(noticeSn);
//
//        if(notice == null) throw new RuntimeException("공지사항 삭제에 실패하였습니다.");
//
//
//        return noticeRepo.delete(notice);
//    }
}
