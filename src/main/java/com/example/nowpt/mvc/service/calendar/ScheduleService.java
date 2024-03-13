package com.example.nowpt.mvc.service.calendar;

import com.example.nowpt.mvc.model.Schedule;
import com.example.nowpt.mvc.repository.schedule.ScheduleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepo scheduleRepo;

    public boolean deleteSchedule(long scheduleSn) {
        Schedule schedule = scheduleRepo.findByScheduleSn(scheduleSn);
        if (schedule == null) return false;

        schedule.setUseYn("N");
        scheduleRepo.save(schedule);
        return true;
    }
}
