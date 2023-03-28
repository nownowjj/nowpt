package com.example.nowpt.mvc.restcontoller.room;

import com.example.nowpt.mvc.dto.RoomCreateDto;
import com.example.nowpt.mvc.model.Room;
import com.example.nowpt.repository.room.RoomRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomCreateService {
    private final ModelMapper modelMapper;
    private final RoomRepo roomRepo;


    // 방 생성
    public Room createRoom(Long memberSn, RoomCreateDto roomCreateDto) {
        Room newRoom = modelMapper.map(roomCreateDto, Room.class);
        newRoom.setRoomTitle(roomCreateDto.getRoomTitle());
        newRoom.setOpenYn(roomCreateDto.getOpenYn());
        newRoom.setRoomPw(roomCreateDto.getRoomPw());
        newRoom.setFrstRegistMembSn(memberSn);
        return roomRepo.save(newRoom);
    }

    // 방 생성전에 생성 횟수 확인
    public int selectCountsRoom(Long memberSn) {
        return roomRepo.countByFrstRegistMembSn(memberSn);
    }
}
