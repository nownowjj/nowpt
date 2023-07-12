package com.example.nowpt.mvc.repository.calendar;

import com.example.nowpt.mvc.dto.CalenderDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarCustomRepo {
    List<String> selectRecordDate (CalenderDto calenderDto);

    List<CalenderDto> selectDetailRecord (CalenderDto calenderDto);
}
