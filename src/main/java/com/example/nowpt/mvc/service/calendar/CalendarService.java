package com.example.nowpt.mvc.service.calendar;

import com.example.nowpt.mvc.common.CommonUtils;
import com.example.nowpt.mvc.dto.CalendarDto;
import com.example.nowpt.mvc.dto.CalendarSmDto;
import com.example.nowpt.mvc.model.Calendar;
import com.example.nowpt.mvc.repository.calendar.CalendarRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final CalendarRepo calendarRepo;

    // 기록한 일자 조회
    public List<String> selectRecordDate(String recordDate , long memberSn){
        return calendarRepo.selectRecordDate(recordDate,memberSn);
    }

    // 일자 상세
    public List<CalendarDto> selectDetailRecord(CalendarDto calendarDto){
        return calendarRepo.selectDetailRecord(calendarDto);
    }


//    Data data = (OptionalData).orElseGet(Data::new);
//    Optional로 감싸진 Data가 null이 아니면 Data 객체에 data가 들어갑니다.
//    Optional로 감싸진 Data가 null이면 Data 객체에 new Data가 들어갑니다.
    @Transactional
    public Calendar recordSave(final Calendar calendar) {
        Calendar newCalendar = calendarRepo.findById(calendar.getCalendarSn()).orElseGet(Calendar::new);
        newCalendar.setTitle(calendar.getTitle());
        newCalendar.setContent(calendar.getContent());
        newCalendar.setLastChangeDt(LocalDateTime.now());
        CommonUtils.saveIfNullId(calendar.getCalendarSn(), calendarRepo, newCalendar);
        return newCalendar;
    }


    // 일정 삭제
    public Calendar deleteRecord(Calendar calendar) {
        calendar.setUseYn("N");
        return calendarRepo.save(calendar);
    }

    // 기록 즐겨찾기 등
    public Calendar importRecord(Calendar calendar,boolean importYn) {
        calendar.setImportYn(importYn);
        return calendarRepo.save(calendar);
    }

    // 일정 조회
    public Calendar findByCalendarSn(Long calendarSn){
        return calendarRepo.findByCalendarSn(calendarSn);
    }

    // 중요 일정 조회
    public Page<CalendarDto> findImportRecordByMembSn(Long memberSn , Pageable pageable){
        return calendarRepo.findImportRecordByMembSn(memberSn, pageable);
    }

    // 기록 통계 년,월별 기록 건 수
    public List<CalendarSmDto> selectMyRecordSm(Long membSn){
        return calendarRepo.selectMyRecordSm(membSn);
    }


    // 내 친구 일정 조회
    public Page<CalendarDto> selectMyFriendRecord(long memberSn , Pageable pageable){
        return calendarRepo.selectMyFriendRecord(memberSn, pageable);
    }
}
