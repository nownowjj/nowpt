package com.example.nowpt.mvc.restcontoller;

import com.example.nowpt.cmm.code.ApiCd;
import com.example.nowpt.cmm.rvo.RVO;
import com.example.nowpt.mvc.dto.NoticeDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Notice;
import com.example.nowpt.repository.notice.NoticeRepo;
import com.example.nowpt.service.admin.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api")
public class AdminRestController {
    @Autowired private NoticeService noticeService;
    @Autowired private NoticeRepo noticeRepo;

    /**
     *
     * @param member
     * @param noticeDto
     * @return 관리자 공지사항 등록 API
     *
     */
    @PostMapping("/notice/admin/insertNotice")
    public RVO<Notice> insertNotice(@AuthenticationPrincipal Member member, @RequestBody NoticeDto noticeDto){
        log.debug("Notice Insert : {}" , noticeDto);
        return RVO.<Notice>builder()
                .msg("공지사항을 등록이 완료되었습니다.")
                .code(ApiCd.NORMAL)
                .data(noticeService.insertNotice(member,noticeDto))
                .build();
    }

    /**
     *
     * @param pageable
     * @return 누구나 접근가능한 공지사항 조회 API
     */
    @GetMapping("/notice/auth/selectNotice")
    public RVO<Page<Notice>> selectNotice(
            @PageableDefault(page = 0, size = 2) Pageable pageable
    ){
//        log.debug("Notice Select : {}" ,noticeService.selectNotice(pageable) );
        return RVO.<Page<Notice>>builder()
                .msg("공지사항 조회")
                .code(ApiCd.NORMAL)
                .data(noticeService.selectNotice(pageable))
                .build();
    }

    /**
     *
     * @param noticeSn
     * @param noticeDto
     * @return 공지사항 수정 API PUT -> Patch는 바꾸고 싶은 값만 변경 가능하다. > (PUT으로 바꿈)
     */
    @PutMapping("/notice/admin/{noticeSn}")
    public RVO<Notice> patchNotice(@PathVariable Long noticeSn,@RequestBody NoticeDto noticeDto,@AuthenticationPrincipal Member member){
        log.debug("Notice patch : {}",noticeDto);
        return RVO.<Notice>builder()
                .msg("공지사항 수정완료.")
                .code(ApiCd.NORMAL)
                .data(noticeService.patchNotice(noticeSn,noticeDto,member.getMemberSn()))
                .build();
    }

    /**
     *
     * @param noticeSn
     * 공지사항 삭제 API
     */
    @DeleteMapping("/notice/admin/{noticeSn}")
    public void deleteNotice (@PathVariable Long noticeSn) {
        log.debug("Notice delete : {}", noticeSn);
        Notice notice =  noticeRepo.findByNoticeSn(noticeSn);
        if(notice == null){
            throw new RuntimeException("공지사항 삭제에 실패하였습니다.");
        }
        else{
            noticeRepo.delete(notice);
        }
    }
}
