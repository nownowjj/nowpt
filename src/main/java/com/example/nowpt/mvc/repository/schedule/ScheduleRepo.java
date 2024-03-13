package com.example.nowpt.mvc.repository.schedule;

import com.example.nowpt.mvc.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepo extends JpaRepository<Schedule, Long>, ScheduleCustomRepo {
    Schedule findByScheduleSn(long scheduleSn);

}
