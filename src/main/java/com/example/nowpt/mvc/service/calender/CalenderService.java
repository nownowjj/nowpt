package com.example.nowpt.mvc.service.calender;

import com.example.nowpt.mvc.common.CommonUtils;
import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.dto.CalenderSmDto;
import com.example.nowpt.mvc.dto.ProductLikeDto;
import com.example.nowpt.mvc.model.Calendar;
import com.example.nowpt.mvc.model.ProductLike;
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
public class CalenderService {
    private final CalendarRepo calenderRepo;

    // 기록한 일자 조회
    public List<String> selectRecordDate(CalenderDto calenderDto){
        return calenderRepo.selectRecordDate(calenderDto);
    }

    // 일자 상세
    public List<CalenderDto> selectDetailRecord(CalenderDto calenderDto){
        return calenderRepo.selectDetailRecord(calenderDto);
    }


//    Data data = (OptionalData).orElseGet(Data::new);
//    Optional로 감싸진 Data가 null이 아니면 Data 객체에 data가 들어갑니다.
//    Optional로 감싸진 Data가 null이면 Data 객체에 new Data가 들어갑니다.
    @Transactional
    public Calendar recordSave(final Calendar calendar) {
        Calendar newCalendar = calenderRepo.findById(calendar.getCalendarSn()).orElseGet(Calendar::new);
        newCalendar.setTitle(calendar.getTitle());
        newCalendar.setContent(calendar.getContent());
        newCalendar.setLastChangeDt(LocalDateTime.now());
        CommonUtils.saveIfNullId(calendar.getCalendarSn(), calenderRepo, newCalendar);
        return newCalendar;
    }


    // 일정 삭제
    public Calendar deleteRecord(Calendar calendar) {
        calendar.setUseYn("N");
        return calenderRepo.save(calendar);
    }

    // 기록 즐겨찾기 등
    public Calendar importRecord(Calendar calendar,boolean importYn) {
        calendar.setImportYn(importYn);
        return calenderRepo.save(calendar);
    }

    // 일정 조회
    public Calendar findByCalendarSn(Long calendarSn){
        return calenderRepo.findByCalendarSn(calendarSn);
    }

    // 중요 일정 조회
    public Page<CalenderDto> findImportRecordByMembSn(Long memberSn , Pageable pageable){
        return calenderRepo.findImportRecordByMembSn(memberSn, pageable);
    }

    // 기록 통계 년,월별 기록 건 수
    public List<CalenderSmDto> selectMyRecordSm(Long membSn){
        return calenderRepo.selectMyRecordSm(membSn);
    }

}
