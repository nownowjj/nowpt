package com.example.nowpt.mvc.repository.calendar;

import com.example.nowpt.mvc.dto.CalendarDto;
import com.example.nowpt.mvc.dto.CalendarSmDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarCustomRepo {
    List<String> selectRecordDate (CalendarDto calendarDto);

    List<CalendarDto> selectDetailRecord (CalendarDto calendarDto);

    List<CalendarSmDto> selectMyRecordSm (Long membSn);

    Page<CalendarDto> findImportRecordByMembSn(Long calendarSn , Pageable pageable);
}
