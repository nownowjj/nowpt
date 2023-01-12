package com.example.nowpt.repository.reservation;

import com.example.nowpt.mvc.model.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationCustomRepo {
    Page<Reservation> selectReservationPaging(Pageable pageable,String startDay, String endDay, String room);

}
