package com.example.nowpt.mvc.restcontoller.calender;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.dto.CalenderSmDto;
import com.example.nowpt.mvc.model.Calendar;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.ProductLike;
import com.example.nowpt.mvc.repository.calendar.CalendarRepo;
import com.example.nowpt.mvc.service.calender.CalenderService;
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
public class CalenderRestController {
    private final CalenderService calenderService;
    private final CalendarRepo calendarRepo;

    @PostMapping("/api/calendar")
    public ResponseDto<?> selectRecordDate(@AuthenticationPrincipal Member member , @RequestBody CalenderDto calenderDto){
        log.debug("기록 일자 리스트 조회 : {}"  ,calenderDto);

        calenderDto.setMemberSn(member.getMemberSn());
        List<String> calenderList = calenderService.selectRecordDate(calenderDto);

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, calenderList);
    }

    @PostMapping("/api/calendar/insert")
    public Calendar createRecord(@AuthenticationPrincipal Member member,@RequestBody Calendar calendar){
        calendar.setMemberSn(member.getMemberSn());

        log.debug("calendar : {}" , calendar);

        if(calendar.getCalendarSn() != null){
            Calendar updateCalendar = calendarRepo.findById(calendar.getCalendarSn()).orElse(null);
            updateCalendar.setTitle(calendar.getTitle());
            updateCalendar.setContent(calendar.getContent());
            updateCalendar.setLastChangeDt(LocalDateTime.now());

            return calendarRepo.save(updateCalendar);
        }else return calendarRepo.save(calendar);
    }

    @GetMapping("/api/calendar")
    public ResponseDto<?> selectDetailRecord(@AuthenticationPrincipal Member member , @RequestParam String recordDate , CalenderDto calenderDto){
        log.debug("기록 일자 상세 조회 : {}"  ,recordDate);
//        log.debug("emm : {}",member);
//        if(member == null) return ResponseUtil.FAILURE(Cd.ANNONYMOUSE_USER, "로그인 필요");
        calenderDto.setMemberSn(member.getMemberSn());
        calenderDto.setRecordDate(recordDate);
        List<CalenderDto> calenderList = calenderService.selectDetailRecord(calenderDto);

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, calenderList);
    }


    @DeleteMapping("/api/calendar")
    public ResponseDto<?> deleteRecord(@AuthenticationPrincipal Member member ,@RequestParam Long calendarSn){
        log.debug("일정 삭제 : {}"  ,calendarSn);
        Calendar calendar = calenderService.findByCalendarSn(calendarSn);
        if(calendar != null)return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, calenderService.deleteRecord(calendar));
        else return ResponseUtil.FAILURE(Cd.DELETE_FAIL, null);
    }

    @GetMapping("/api/auth/calendar/myRecord")
    public ResponseDto<?> selectMyRecordSm(@AuthenticationPrincipal Member member){
        Map<String,List<?>> result = new HashMap<>();

        List<Member> members = Arrays.asList(member);
        List<CalenderSmDto> myRecordSmList = calenderService.selectMyRecordSm(member.getMemberSn());


        result.put("myRecordSmList",myRecordSmList);
        result.put("member",members);


        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, result);
    }


    @PutMapping("/api/calendar")
    public ResponseDto<?> importRecord(@RequestParam Long calendarSn ,@RequestParam boolean importYn){
        log.debug("일정 즐겨찾기 : {} , {}"  ,calendarSn , (importYn ? "등록" : "취소"));
        Calendar calendar = calenderService.findByCalendarSn(calendarSn);
        if(calendar != null)return ResponseUtil.SUCCESS(Cd.PUT_SUCCESS, calenderService.importRecord(calendar,importYn));
        else return ResponseUtil.FAILURE(Cd.PUT_FAIL, null);
    }

    @GetMapping("/api/calendar/import")
    public ResponseDto<?> selectImportRecord(@AuthenticationPrincipal Member member,Pageable pageable){
        Page<CalenderDto> calendar = calenderService.findImportRecordByMembSn(member.getMemberSn(),pageable);
        if(calendar != null)return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, calendar);
        else return ResponseUtil.FAILURE(Cd.SELECT_FAIL, null);
    }


}
