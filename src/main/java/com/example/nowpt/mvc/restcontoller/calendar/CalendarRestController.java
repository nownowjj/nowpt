package com.example.nowpt.mvc.restcontoller.calendar;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.common.CustomException;
import com.example.nowpt.mvc.common.RestBase;
import com.example.nowpt.mvc.dto.CalendarDto;
import com.example.nowpt.mvc.dto.CalendarSmDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.repository.calendar.CalendarRepo;
import com.example.nowpt.mvc.service.calendar.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class CalendarRestController {
    private final CalendarService calendarService;

    /**
     * @param recordDate 조회 년월
     * @return 기록 일자 List
     */
    @GetMapping
    public ResponseDto<?> selectRecordDate(@AuthenticationPrincipal Member member, @RequestParam String recordDate){
        log.debug("요청일자 : {}" , recordDate);
        if(recordDate != null) throw new CustomException("요청일자가 있는데?");
        List<String> calendarList = calendarService.selectRecordDate(recordDate , member.getMemberSn());
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, calendarList);
    }

    @DeleteMapping
    public ResponseDto<?> deleteRecord(@RequestParam Long calendarSn){
        return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, calendarService.deleteRecord(calendarSn));
    }

    @PutMapping
    public ResponseDto<?> importRecord(@RequestParam Long calendarSn ,@RequestParam boolean importYn){
        return ResponseUtil.SUCCESS(Cd.PUT_SUCCESS, calendarService.importRecord(calendarSn,importYn));
    }

    @PostMapping
    public ResponseDto<?> upsertRecord(@AuthenticationPrincipal Member member, @RequestBody CalendarDto calendarDto){
        calendarDto.setMemberSn(member.getMemberSn());
        return ResponseUtil.SUCCESS(Cd.POST_SUCCESS, calendarService.upsertRecord(calendarDto));
    }


    @GetMapping("/detail")
    public ResponseDto<?> selectDetailRecord(@AuthenticationPrincipal Member member , @RequestParam String recordDate , CalendarDto calendarDto) throws InterruptedException {
        calendarDto.setMemberSn(member.getMemberSn());
        calendarDto.setRecordDate(recordDate);
        List<CalendarDto> calendarList = calendarService.selectDetailRecord(calendarDto);
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, calendarList);
    }


    @GetMapping("/myRecord")
    public ResponseDto<?> selectMyRecordSm(@AuthenticationPrincipal Member member){
        Map<String,List<?>> result = new HashMap<>();

        List<Member> members = Arrays.asList(member);
        List<CalendarSmDto> myRecordSmList = calendarService.selectMyRecordSm(member.getMemberSn());


        result.put("myRecordSmList",myRecordSmList);
        result.put("member",members);


        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, result);
    }

    @GetMapping("/import")
    public ResponseDto<?> selectImportRecord(@AuthenticationPrincipal Member member,Pageable pageable) throws InterruptedException {
        Page<CalendarDto> calendar = calendarService.findImportRecordByMembSn(member.getMemberSn(),pageable);
        log.debug("페이징 ㅎㄹ : {}" , pageable);
        log.debug("결과 {} ",calendar.toString());
        if(calendar != null)return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, calendar);
        else return ResponseUtil.FAILURE(Cd.SELECT_FAIL, null);
    }


}
