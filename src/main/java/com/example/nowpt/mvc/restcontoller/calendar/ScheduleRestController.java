package com.example.nowpt.mvc.restcontoller.calendar;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.ScheduleDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.repository.schedule.ScheduleRepo;
import com.example.nowpt.mvc.service.calendar.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import oracle.ucp.proxy.annotation.Post;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/schedule")
public class ScheduleRestController {
    private final ScheduleRepo scheduleRepo;
    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseDto<?> getSchedule(@AuthenticationPrincipal Member member, @RequestParam String date){
        log.debug("스케쥴 조회 월 : {}" , date);

        List<ScheduleDto> scheduleList = scheduleRepo.selectSchedule(date , member.getMemberSn());
        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, scheduleList);
    }

    @DeleteMapping
    public ResponseDto<?> deleteSchedule(@RequestBody ScheduleDto scheduleDto){
        log.debug("스케쥴 삭제: {}" , scheduleDto.getScheduleSn());
        return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, scheduleService.deleteSchedule(scheduleDto.getScheduleSn()));
    }

    /**
     * @param scheduleDto {title, color ,startDate , endDate}
     * @return boolean
     */
    @PostMapping
    public ResponseDto<?> insertSchedule(@AuthenticationPrincipal Member member , @RequestBody ScheduleDto scheduleDto){
        log.debug("스케쥴 등록 : {}" , scheduleDto);
        scheduleDto.setMemberSn(member.getMemberSn());
        return ResponseUtil.SUCCESS(Cd.POST_SUCCESS, scheduleService.saveSchedule(scheduleDto));
    }

    /**
     * @param scheduleDto {title, color ,startDate , endDate}
     * @return boolean
     */
    @PutMapping
    public ResponseDto<?> updateSchedule(@RequestBody ScheduleDto scheduleDto){
        log.debug("스케쥴 수정 : {}" , scheduleDto);
        return ResponseUtil.SUCCESS(Cd.PUT_SUCCESS, scheduleService.saveSchedule(scheduleDto));
    }
}
