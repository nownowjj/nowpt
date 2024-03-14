package com.example.nowpt.mvc.service.calendar;

import com.example.nowpt.mvc.dto.ScheduleDto;
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

    public Schedule insertSchedule(ScheduleDto scheduleDto) {
        Schedule schedule = new Schedule();
        schedule.setTitle(scheduleDto.getTitle());
        schedule.setColor(scheduleDto.getColor());
        schedule.setStartDate(scheduleDto.getStartDate());
        schedule.setEndDate(scheduleDto.getEndDate());
        schedule.setMemberSn(scheduleDto.getMemberSn());
        schedule.setUseYn("Y");

        return scheduleRepo.save(schedule);
    }
}
