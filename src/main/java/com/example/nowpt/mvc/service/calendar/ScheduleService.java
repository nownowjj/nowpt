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

    public Schedule deleteSchedule(long scheduleSn) {
        Schedule schedule = scheduleRepo.findByScheduleSn(scheduleSn);
        schedule.setUseYn("N");
        return scheduleRepo.save(schedule);
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

    public Schedule updateSchedule(ScheduleDto scheduleDto) {
        Schedule schedule = scheduleRepo.findByScheduleSn(scheduleDto.getScheduleSn());
        schedule.setTitle(scheduleDto.getTitle());
        schedule.setColor(scheduleDto.getColor());
        schedule.setStartDate(scheduleDto.getStartDate());
        schedule.setEndDate(scheduleDto.getEndDate());
        return scheduleRepo.save(schedule);
    }

    public Schedule saveSchedule(ScheduleDto scheduleDto) {
        Schedule schedule;
        if (scheduleDto.getScheduleSn() != null) {
            schedule = scheduleRepo.findByScheduleSn(scheduleDto.getScheduleSn());
        } else {
            schedule = new Schedule();
        }

        schedule.setTitle(scheduleDto.getTitle());
        schedule.setColor(scheduleDto.getColor());
        schedule.setStartDate(scheduleDto.getStartDate());
        schedule.setEndDate(scheduleDto.getEndDate());
        schedule.setMemberSn(scheduleDto.getMemberSn());
        schedule.setUseYn("Y");

        return scheduleRepo.save(schedule);
    }

}
