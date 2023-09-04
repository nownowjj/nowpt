package com.example.nowpt.mvc.repository.calendar;

import com.example.nowpt.mvc.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepo extends JpaRepository<Calendar, Long> , CalendarCustomRepo {
    Calendar findByCalendarSn(Long calendarSn);
}
