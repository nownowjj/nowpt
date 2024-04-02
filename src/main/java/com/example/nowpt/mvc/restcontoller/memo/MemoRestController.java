package com.example.nowpt.mvc.restcontoller.memo;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.MemoDto;
import com.example.nowpt.mvc.dto.ScheduleDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Memo;
import com.example.nowpt.mvc.repository.memo.MemoRepo;
import com.example.nowpt.mvc.service.memo.MemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/memo")
public class MemoRestController {
    private final MemoRepo memoRepo;
    private final MemoService memoService;


    @GetMapping
    public ResponseDto<?> getMemo(@AuthenticationPrincipal Member member){
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, memoRepo.findAllByMemberSnAndUseYn(member.getMemberSn(),"Y"));
    }

    /**
     * @param memoDto {title, content}
     * @return boolean
     */
    @PostMapping
    public ResponseDto<?> upsertMemo(@AuthenticationPrincipal Member member , @RequestBody MemoDto memoDto){
        log.debug("메모 등록 : {}" , memoDto);
        memoDto.setMemberSn(member.getMemberSn());
        return ResponseUtil.SUCCESS(Cd.POST_SUCCESS, memoService.upsertMemo(memoDto));
    }

}
