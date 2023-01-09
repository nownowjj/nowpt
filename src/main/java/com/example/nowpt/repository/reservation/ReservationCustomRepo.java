package com.example.nowpt.repository.reservation;

import com.example.nowpt.mvc.model.Notice;
import com.example.nowpt.mvc.model.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationCustomRepo {
    Page<Reservation> selectReservationPaging(Pageable pageable);

}
