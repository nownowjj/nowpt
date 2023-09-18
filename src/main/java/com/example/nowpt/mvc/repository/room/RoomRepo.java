package com.example.nowpt.mvc.repository.room;

import com.example.nowpt.mvc.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepo extends JpaRepository<Room, Long>, RoomCustomRepo {

    int countByFrstRegistMembSn(Long memberSn);
}
