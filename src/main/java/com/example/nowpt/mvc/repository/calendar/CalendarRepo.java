package com.example.nowpt.mvc.repository.calendar;

import com.example.nowpt.mvc.dto.CalenderDto;
import com.example.nowpt.mvc.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepo extends JpaRepository<Calendar, Long> , CalendarCustomRepo {
    Calendar findByCalendarSn(Long calendarSn);
}
