package com.example.nowpt.mvc.service.memo;

import com.example.nowpt.mvc.dto.ScheduleDto;
import com.example.nowpt.mvc.model.Schedule;
import com.example.nowpt.mvc.repository.schedule.ScheduleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemoService {
    private final ScheduleRepo scheduleRepo;



}
