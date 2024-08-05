package com.example.nowpt.mvc.service.calendar;

import com.example.nowpt.mvc.common.CommonUtils;
import com.example.nowpt.mvc.dto.CalendarDto;
import com.example.nowpt.mvc.dto.CalendarSmDto;
import com.example.nowpt.mvc.model.Calendar;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Memo;
import com.example.nowpt.mvc.repository.calendar.CalendarRepo;
import com.example.nowpt.mvc.repository.member.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CalendarService {
    private final CalendarRepo calendarRepo;
    private final MemberRepo memberRepo;

    // 기록한 일자 조회
    public List<String> selectRecordDate(String recordDate , long memberSn){
        return calendarRepo.selectRecordDate(recordDate,memberSn);
    }

    // 일자 상세
    public List<CalendarDto> selectDetailRecord(CalendarDto calendarDto){
        return calendarRepo.selectDetailRecord(calendarDto);
    }

    // 일정 삭제
    public boolean deleteRecord(long calendarSn) {
        Calendar calendar = calendarRepo.findByCalendarSn(calendarSn);
        calendar.setUseYn("N");
        calendarRepo.save(calendar);
        return true;
    }

    // 기록 즐겨찾기
    public Calendar importRecord(long calendarSn , boolean importYn) {
        Calendar calendar = calendarRepo.findByCalendarSn(calendarSn);
        calendar.setImportYn(importYn);
        return calendarRepo.save(calendar);
    }

    // 기록 등록 및 수정
    public Calendar upsertRecord(CalendarDto calendarDto) {
        Calendar newCalendar = calendarDto.getCalendarSn() != null ?  calendarRepo.findByCalendarSn(calendarDto.getCalendarSn()) : new Calendar();
        if(calendarDto.getCalendarSn() == null) newCalendar.setRecordDate(calendarDto.getRecordDate());

        newCalendar.setTitle(calendarDto.getTitle());
        newCalendar.setContent(calendarDto.getContent());
        newCalendar.setMemberSn(calendarDto.getMemberSn());
        newCalendar.setImportYn(calendarDto.getImportYn());
        return calendarRepo.save(newCalendar);
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
