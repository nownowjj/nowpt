import React, {useState} from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import styled from "styled-components";
import dayjs from "dayjs";
import ko from 'date-fns/locale/ko';
import Button from "../../component/JoinButton";
import roomData from "../../db/MeetingRoomData.json"
import {insertReservation} from "../../api/ReservationApi";
import Input from "../../component/Input";

const MeetingReservationComponent = () => {
    registerLocale("ko", ko); //한국어 설정
    const now = dayjs().toDate();
    const [startDay, setStartDay] = useState(new Date());
    const [startTime,setStartTime] = useState("");
    const [endTime , setEndTime] = useState("");
    const [room , setRoom] = useState("대회의실");
    const [purpose , setPurpose] = useState("");


    const setStartDayEvent =(date) =>{
        setStartDay(date)
        console.log(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'));
    }

    const setStartTimeEvent = (date)=>{
        if(!endTime){
            // console.log("종료시간 없음");
            setStartTime(date);
            return true;
        }
        else if(endTime < date || date.getHours()+":"+date.getMinutes() === endTime.getHours()+":"+endTime.getMinutes()){
            // console.log("종료시간 존재함")
            alert("시작시간이 종료시간보다 크거나 같습니다.")
            console.log(endTime);
            return false;
        }else if(date < endTime){
            // console.log("종료시간이 존재하고 시작 < 종료 임")
            setStartTime(date)
        }
        return true;
    }



    const setEndTimeEvent = (date)=>{
        // console.log(startTime.getHours()+":"+startTime.getMinutes())
        // console.log(date.getHours()+":"+date.getMinutes())
        if(date < startTime || date.getHours()+":"+date.getMinutes() === startTime.getHours()+":"+startTime.getMinutes()){
            alert("종료 시간이 잘못 되었습니다.")
            return false;
        }
        setEndTime(date)
    }

    const reservationEvent =()=>{
        if(!checkDay()){
            alert("검증 통과 실패");
            return false;
        }
        alert("검증 통과 성공");

        let year = String(startDay.getFullYear());
        let month = String(startDay.getMonth()+1).padStart(2,"0");
        let day = String(startDay.getDate()).padStart(2,"0");

        let dataDay = year + '-' + month + '-' + day;
        let dataStart = dataDay+"T"+String(startTime.getHours()).padStart(2,"0") + ":" + String(startTime.getMinutes()).padStart(2,"0")+":01.000";
        let dataEnd = dataDay+"T"+String(endTime.getHours()).padStart(2,"0") + ":" + String(endTime.getMinutes()).padStart(2,"0")+":00.999";
        console.log("회의실 : %s",room)
        console.log("등록일 : %s",dataDay)
        console.log("시작시간 : %s",dataStart)
        console.log("종료시간: %s",dataEnd)
        console.log("사용목적 : %s",purpose)


        let reservationDto = {
            meetingRoom : room,
            purpose : purpose,
            useDay : dataDay,
            useStartTime : dataStart,
            useEndTime : dataEnd
        }

        if(window.confirm("회의실 : "+ room +"\n"+ "등록일 : " + dataDay+"\n" + "시작시간 : " + dataStart+"\n" + "종료시간 : "+ dataEnd+"\n" + "사용목적 : "+ purpose+"\n" +"회의실 예약을 진행합니다.")){

            insertReservation(reservationDto)
                .then(response=>{
                    console.log(response);
                    alert(response.msg)
                }).catch(error=>{
                console.log(error)
            })

            return true;
        }else{
            // 확인
            return false;
        }




        
    }

    const filterDays = (date) => {
        // Disable Weekends
        if (date.getDay() === 0 || date.getDay() === 6) {
            return false;
        } else {
            return true;
        }
    }

    function checkDay(){
        if(startTime === "" || startTime === "undefined" || startTime == null){
            alert("시작 시간이 없습니다.");
            return false;
        }
        if(endTime === "" || endTime === "undefined" || endTime == null){
            alert("종료 시간이 없습니다.");
            return false;
        }

        if(startTime > endTime || startTime === endTime){
            alert("시작시간이 종료시간보다 큽니다.");
            return false;
        }

        return true;
    }

    const handleRoomChange = (e) => {
        setRoom(e.target.value);
        console.log(e.target.value);
    };

    const handlePurposeChange =(value)=>{
        setPurpose(value);
    }

    return (
        <div>
            <h2>예약 등록</h2>


            <select onChange={handleRoomChange}>
                {roomData.meetingRoom.map((room) => (
                    <option key={room.id}
                        value={room.value}
                    >
                        {room.roomName}
                    </option>
                ))}
            </select>

            <MyDatePicker
                locale="ko"
                selected={startDay}
                minDate={now}
                onChange={date => setStartDayEvent(date)}
                dateFormat="yyyy년 MM월 dd일(eee)"
                filterDate={filterDays}
            />

            <MyDatePicker
                selected={startTime}
                onChange={date => setStartTimeEvent(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                // timeCaption="Time"
                dateFormat="aa hh:mm 시작"
                placeholderText="시작 시간"
                minTime={new Date(0, 0, 0, 9, 0)}
                maxTime={new Date(0, 0, 0, 18, 0)}
            />

            {
                startTime === ""
                ?
                    <p>시작 시간을 설정 하세요</p>
                    :
                    <MyDatePicker
                        selected={endTime}
                        onChange={date => setEndTimeEvent(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        // timeCaption="Time"
                        dateFormat="aa hh:mm 종료"
                        placeholderText="종료 시간"
                        minTime={startTime}
                        maxTime={new Date(0, 0, 0, 18, 0)}
                    />
            }

            <div>
                <p>사용목적</p>
                <Input
                    type="text"
                    placeholder={"사용목적"}
                    name="purpose"
                    value={purpose}
                    onChange={handlePurposeChange}
                />
            </div>

            <Button
                value="등록"
                onClick={reservationEvent}
            />
    
        </div>
    );
};

const MyDatePicker = styled(DatePicker)`
  border-radius: 4px;
  border: 2px solid #e8e8e8;
  padding: 10px 10px 10px 10px;
  background-color: white;
  margin: 2px;
  outline:none;
  width:250px;

  @media (max-width: 768px) {
    width:97%;
    // margin
  };
`

export default MeetingReservationComponent;