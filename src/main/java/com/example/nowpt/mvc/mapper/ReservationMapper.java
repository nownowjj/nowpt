package com.example.nowpt.mvc.mapper;

import com.example.nowpt.mvc.dto.Result;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Mapper
public interface ReservationMapper {
    Result<?> availabilityReservation(LocalDate useDay, LocalDateTime useStartTime, LocalDateTime useEndTime, String meetingRoom);

//    List<Map<String,String>> selectAllMember();// select 의 값이 여러개라면 List에 Map을 담고
    // Map<KEY, VALUE> value는 Object 타입을 넣을 수도 있다(Map<String, Object>).
//    Map<String, String> selectAllMember(); // select의 값이 하나라면 그냥 Map에만 담아도 된다.
}
