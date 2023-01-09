package com.example.nowpt.service;

import com.example.nowpt.cmm.rvo.RVO;
import com.example.nowpt.mvc.dto.ReservationDto;
import com.example.nowpt.mvc.dto.Result;
import com.example.nowpt.mvc.mapper.ReservationMapper;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Reservation;
import com.example.nowpt.repository.reservation.ReservationRepo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
public class ReservationService {
    @Autowired private ReservationRepo reservationRepo;
    @Autowired private ModelMapper modelMapper;
    @Autowired private ReservationMapper reservationMapper;

    /**
     * @param member
     * @param reservationDto
     * @return 예약 등록
     */
    public Reservation insertReservation(Member member, ReservationDto reservationDto) {
        // 해당 예약시간 존재여부
        Result<?> data = reservationMapper.availabilityReservation(reservationDto.getUseDay(),reservationDto.getUseStartTime(),reservationDto.getUseEndTime(),reservationDto.getMeetingRoom());
        log.debug("mapper data : {} , cnt : {}",data,data.getCount());

        int cnt = data.getCount();
        if(cnt == 0 ){
            log.debug("예약 가능한 시간");
            Reservation newReservation = modelMapper.map(reservationDto, Reservation.class);
            newReservation.setMemberSn(member);
            newReservation.setFrstRegistMembSn(member.getMemberSn());


            log.debug("newReservation : {}" , newReservation);
            log.debug("시작시간 : {} , 종료시간 : {} " , reservationDto.getUseStartTime(),reservationDto.getUseEndTime());
            return reservationRepo.save(newReservation);
        }else {
            log.debug("요청하신 시간에 이미 예약이 존재합니다.");
            throw new RuntimeException("시간 설정을 다시 해주세요");
        }


    }
}
