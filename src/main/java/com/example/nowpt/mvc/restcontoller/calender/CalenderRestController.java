package com.example.nowpt.mvc.restcontoller.calender;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.model.Calendar;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.ProductLike;
import com.example.nowpt.mvc.repository.calendar.CalendarRepo;
import com.example.nowpt.mvc.service.calender.CalenderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CalenderRestController {
    private final CalenderService calenderService;
    private final CalendarRepo calendarRepo;

    @PostMapping("/api/auth/calendar")
    public ResponseDto<?> selectRecordDate(@AuthenticationPrincipal Member member , @RequestBody CalenderDto calenderDto){
        log.debug("기록 일자 리스트 조회 : {}"  ,calenderDto);
        calenderDto.setMemberSn(member.getMemberSn());
        List<String> calenderList = calenderService.selectRecordDate(calenderDto);

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, calenderList);
    }

    @PostMapping("/api/auth/calendar/insert")
    public Calendar createRecord(@AuthenticationPrincipal Member member,@RequestBody Calendar calendar){
        calendar.setMemberSn(member.getMemberSn());

        log.debug("calendar : {}" , calendar);

        if(calendar.getCalendarSn() != null){
            Calendar updateCalendar = calendarRepo.findById(calendar.getCalendarSn()).orElse(null);
            assert updateCalendar != null;
            updateCalendar.setTitle(calendar.getTitle());
            updateCalendar.setContent(calendar.getContent());
            updateCalendar.setLastChangeDt(LocalDateTime.now());

            return calendarRepo.save(updateCalendar);
        }else return calendarRepo.save(calendar);
    }

    @GetMapping("/api/auth/calendar")
    public ResponseDto<?> selectDetailRecord(@AuthenticationPrincipal Member member , @RequestParam String recordDate , CalenderDto calenderDto){
        log.debug("기록 일자 리스트 조회 : {}"  ,recordDate);
        calenderDto.setMemberSn(member.getMemberSn());
        calenderDto.setRecordDate(recordDate);
        List<CalenderDto> calenderList = calenderService.selectDetailRecord(calenderDto);

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, calenderList);
    }


    @PutMapping("/api/auth/calendar")
    public ResponseDto<?> deleteRecord(@AuthenticationPrincipal Member member ,@RequestParam Long calendarSn){
        log.debug("일정 삭제 : {}"  ,calendarSn);
        Calendar calendar = calenderService.findByCalendarSn(calendarSn);
        return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, calenderService.deleteRecord(calendar));
    }
//    @PostMapping("/api/auth/calendar/insert")
//    public ResponseDto<?> createRecord(@RequestBody CalenderDto calenderDto){
//        log.debug("calendar : {}" , calenderDto);
//        log.debug("기록 일자 등록");
//
//        return calendarRepo.save(calenderDto);
//    }

}
