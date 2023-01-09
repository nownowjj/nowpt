package com.example.nowpt.mvc.restcontoller.common;


import com.example.nowpt.cmm.code.ApiCd;
import com.example.nowpt.cmm.rvo.RVO;
import com.example.nowpt.mvc.dto.ReservationDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Reservation;
import com.example.nowpt.repository.reservation.ReservationRepo;
import com.example.nowpt.service.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/common/reservation")
public class ReservationRestController {
    @Autowired private ReservationService reservationService;
    @Autowired private ReservationRepo reservationRepo;

    @PostMapping("/insertReservation")
    public RVO<Reservation> insertReservation(@AuthenticationPrincipal Member member, @RequestBody ReservationDto reservationDto){
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
//        LocalDateTime stDateTime = LocalDateTime.parse(start, formatter);
//        LocalDateTime endDateTime = LocalDateTime.parse(end, formatter);

        log.debug("reservationDto : {}", reservationDto);
        return RVO.<Reservation>builder()
                .msg("예약 등록이 완료되었습니다.")
                .code(ApiCd.NORMAL)
                .data(reservationService.insertReservation(member,reservationDto))
                .build();
    }

    @GetMapping("/selectPagingReservation")
    public Page<Reservation> getPagingReservation(
            @PageableDefault(page = 0 , size = 10)
            Pageable pageable
    ){
        return reservationRepo.selectReservationPaging(pageable);
    }
}
