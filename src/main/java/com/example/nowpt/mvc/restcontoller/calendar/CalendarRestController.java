package com.example.nowpt.mvc.restcontoller.calendar;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.CalendarDto;
import com.example.nowpt.mvc.dto.CalendarSmDto;
import com.example.nowpt.mvc.dto.ScheduleDto;
import com.example.nowpt.mvc.model.Calendar;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.repository.calendar.CalendarRepo;
import com.example.nowpt.mvc.repository.schedule.ScheduleRepo;
import com.example.nowpt.mvc.service.calendar.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class CalendarRestController {
    private final CalendarService calendarService;
    private final CalendarRepo calendarRepo;
    private final ScheduleRepo scheduleRepo;

    @GetMapping
    public ResponseDto<?> selectRecordDate(@AuthenticationPrincipal Member member, @RequestParam String recordDate){
        log.debug("요청일자 : {}" , recordDate);

        List<String> calendarList = calendarService.selectRecordDate(recordDate , member.getMemberSn());
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, calendarList);
    }

    @DeleteMapping
    public ResponseDto<?> deleteRecord(@RequestParam Long calendarSn){
        log.debug("일정 삭제 : {}"  ,calendarSn);
        return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, calendarService.deleteRecord(calendarSn));
    }

    @PutMapping
    public ResponseDto<?> importRecord(@RequestParam Long calendarSn ,@RequestParam boolean importYn){
        log.debug("일정 즐겨찾기 : {} , {}"  ,calendarSn , (importYn ? "등록" : "취소"));

        return ResponseUtil.SUCCESS(Cd.PUT_SUCCESS, calendarService.importRecord(calendarSn,importYn));
    }

    @PostMapping
    public ResponseDto<?> createRecord(@AuthenticationPrincipal Member member,@RequestBody CalendarDto calendarDto){
        log.debug("등록 및 수정 : {}", calendarDto);

        if(calendarDto.getCalendarSn() != null){
            log.debug("수정 요청 : {}" , calendarDto.getCalendarSn());
            Calendar updateCalendar = calendarRepo.findById(calendarDto.getCalendarSn()).orElse(null);
            updateCalendar.setTitle(calendarDto.getTitle());
            updateCalendar.setContent(calendarDto.getContent());
            updateCalendar.setLastChangeDt(LocalDateTime.now());
            updateCalendar.setImportYn(calendarDto.getImportYn());

            calendarRepo.save(updateCalendar);

            return ResponseUtil.SUCCESS(Cd.PUT_SUCCESS, updateCalendar);
        }else {
            log.debug("등록 요청 : {}" , calendarDto.getCalendarSn());
            Calendar newCalendar = new Calendar();
            newCalendar.setMemberSn(member.getMemberSn());
            newCalendar.setTitle(calendarDto.getTitle());
            newCalendar.setContent(calendarDto.getContent());
            newCalendar.setImportYn(calendarDto.getImportYn());
            newCalendar.setRecordDate(calendarDto.getRecordDate());
            calendarRepo.save(newCalendar);
            log.debug("new !! : {}",newCalendar);
            return ResponseUtil.SUCCESS(Cd.POST_SUCCESS, newCalendar);
        }
    }


    @GetMapping("/detail")
    public ResponseDto<?> selectDetailRecord(@AuthenticationPrincipal Member member , @RequestParam String recordDate , CalendarDto calendarDto) throws InterruptedException {
        log.debug("기록 일자 상세 조회 : {}"  ,recordDate);


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
