package com.example.nowpt.mvc.restcontoller.common;


import com.example.nowpt.cmm.code.ApiCd;
import com.example.nowpt.cmm.rvo.RVO;
import com.example.nowpt.mvc.dto.ReservationDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Reservation;
import com.example.nowpt.repository.reservation.ReservationRepo;
import com.example.nowpt.mvc.service.ReservationService;
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
            Pageable pageable,
            @RequestParam String startDay,
            @RequestParam String endDay,
            @RequestParam String room
    ){
        log.debug("예약 조회 : 시작일 : {} , 종료일 : {} , 회의실 : {}",startDay,endDay,room);
        return reservationRepo.selectReservationPaging(pageable,startDay,endDay,room);
    }

    /**
     *
     * @param reservationSn
     * @param reservationDto
     * @param member
     * @return
     */
    @PutMapping("/{reservationSn}")
    public RVO<Reservation> patchReservation(@PathVariable Long reservationSn, @RequestBody ReservationDto reservationDto, @AuthenticationPrincipal Member member){
        log.debug("reservation patch : {}",reservationDto);
        return RVO.<Reservation>builder()
                .msg("예약 수정완료.")
                .code(ApiCd.NORMAL)
                .data(reservationService.updateReservation(reservationSn,reservationDto,member))
                .build();
    }

    /**
     *
     * @param reservationSn
     * 예약 삭제
     */
    @DeleteMapping("/{reservationSn}")
    public void deleteReservation (@PathVariable Long reservationSn) {
        log.debug("reservation delete : {}", reservationSn);
        Reservation reservation =  reservationRepo.findByReservationSn(reservationSn);
        if(reservation == null){
            throw new RuntimeException("예약 삭제에 실패하였습니다.");
        }
        else{
            reservationRepo.delete(reservation);
        }
    }

    @GetMapping("/{reservationSn}")
    public RVO<Reservation> selectReservationBySn(@PathVariable Long reservationSn){
        log.debug("Reservation selectBySn : {}" , reservationSn);
        return RVO.<Reservation>builder()
                .msg("예약 상세 정보")
                .code(ApiCd.NORMAL)
                .data(reservationRepo.findByReservationSn(reservationSn))
                .build();
    }
}
