import React, {useState} from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import styled from "styled-components";
import dayjs from "dayjs";
import ko from 'date-fns/locale/ko';
import Button from "../../component/JoinButton";

const MeetingReservationComponent = () => {
    registerLocale("ko", ko); //한국어 설정
    const now = dayjs().toDate();
    const [startDay, setStartDay] = useState(new Date());
    const [startTime,setStartTime] = useState("");
    const [endTime , setEndTime] = useState("")


    const setStartDayEvent =(date) =>{
        setStartDay(date)
        console.log(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'));
    }

    const setStartTimeEvent = (date)=>{
        setStartTime( date)
    }
    const setEndTimeEvent = (date)=>{
        if(date < startTime || date === startTime){
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
        let day = String(startDay.getDate()).padStart(2,"0") + " ";
        let dataDay = year + '-' + month + '-' + day;
        let dataStart = dataDay+String(startTime.getHours()).padStart(2,"0") + ":" + String(startTime.getMinutes()).padStart(2,"0")+":00.000";
        let dataEnd = dataDay+String(endTime.getHours()).padStart(2,"0") + ":" + String(endTime.getMinutes()).padStart(2,"0")+":00.000";
        console.log("등록일 : %s",dataDay)
        console.log("시작시간 : %s",dataStart)
        console.log("종료시간: %s",dataEnd)
        
    }


    // function textFix(n){
    //     n < 10
    //     ?
    //          let "0" + n
    //     :
    //         n
    //     ;
    //
    // }

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

    return (
        <div>
            <h2>예약 등록</h2>

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
            <Button
                value="등록"
                onClick={reservationEvent}
            />
    
        </div>
    );
};

const MyDatePicker = styled(DatePicker)`
  border-radius: 4px;
  border: 2px solid #ef4746;
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