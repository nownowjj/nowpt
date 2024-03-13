package com.example.nowpt.mvc.repository.schedule;

import com.example.nowpt.mvc.dto.ScheduleDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleCustomRepo {
    List<ScheduleDto> selectSchedule(String date , long memberSn);
}
