package com.example.nowpt.mvc.restcontoller;

import com.example.nowpt.cmm.code.ApiCd;
import com.example.nowpt.cmm.rvo.RVO;
import com.example.nowpt.mvc.dto.NoticeDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Notice;
import com.example.nowpt.service.admin.NoticeService;
import lombok.extern.slf4j.Slf4j;
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
}
