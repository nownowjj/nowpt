package com.example.nowpt.mvc.restcontoller.calendar;

import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Schedule;
import com.example.nowpt.mvc.repository.member.MemberRepo;
import com.example.nowpt.mvc.repository.schedule.ScheduleCustomRepo;
import com.example.nowpt.mvc.repository.schedule.ScheduleRepo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootTest
public class CalendarRestControllerTest {
    @Autowired ScheduleRepo scheduleRepo;
    @Autowired MemberRepo memberRepo;

    @Test
    @DisplayName("테스트임")
    @Transactional
    void testMethod(){
        System.out.println("asdsa?");

//        List<Schedule> all = scheduleRepo.findAll();
        Long all = scheduleRepo.count();
        System.out.println(all);
//        Member newMember = memberRepo.save(Member.builder)
        Schedule newSchedule = new Schedule();
//        newSchedule.setScheduleSn(2L);
        newSchedule.setTitle("Test Schedule");
        newSchedule.setColor("Blue");
        newSchedule.setStartDate("20240122"); // Set your desired date format
        newSchedule.setEndDate("20240123"); // Set your desired date format
//        newSchedule.setMemberSn(memberRepo.findByMemberSn(62));

        // Save the new Schedule to the database
        Schedule savedSchedule = scheduleRepo.save(newSchedule);
        Long all2 = scheduleRepo.count();
        System.out.println(all2);
        System.out.println("Saved Schedule ID: " + savedSchedule.getScheduleSn());





    }

}