package com.example.nowpt.repository.reservation;

import com.example.nowpt.mvc.model.Notice;
import com.example.nowpt.mvc.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepo extends JpaRepository<Reservation,Long> , ReservationCustomRepo {
    Reservation findByReservationSn(Long reservationSn);

}
