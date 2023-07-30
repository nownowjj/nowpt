package com.example.nowpt.mvc.repository.calendar;

import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.dto.CalenderSmDto;
import com.example.nowpt.mvc.model.Calendar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarCustomRepo {
    List<String> selectRecordDate (CalenderDto calenderDto);

    List<CalenderDto> selectDetailRecord (CalenderDto calenderDto);

    List<CalenderSmDto> selectMyRecordSm (Long membSn);

    Page<CalenderDto> findImportRecordByMembSn(Long calendarSn , Pageable pageable);
}
