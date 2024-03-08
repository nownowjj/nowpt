package com.example.nowpt.mvc.repository.schedule;

import com.example.nowpt.mvc.model.Room;
import com.example.nowpt.mvc.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepo extends JpaRepository<Schedule, Long>, ScheduleCustomRepo {

//    int countByFrstRegistMembSn(Long memberSn);
//    List<Schedule> findAll();
}
