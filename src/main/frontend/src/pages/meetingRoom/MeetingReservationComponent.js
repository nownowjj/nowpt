import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import styled from "styled-components";
import dayjs from "dayjs";

const MeetingReservationComponent = () => {
    const now = dayjs().toDate();
    const [startDay, setStartDay] = useState(new Date());
    const [startTime,setStartTime] = useState("");
    const [endTime , setEndTime] = useState("")


    const setStartDayEvent =(date) =>{
        setStartDay(date)
        console.log(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'));
    }

    const setStartTimeEvent = (date)=>{
        console.log( date);
        setStartTime( date)
    }
    const setEndTimeEvent = (date)=>{
        console.log(startTime)
        if(date < startTime){
            alert("종료 시간이 잘못 되었습니다.")
            return false;
        }
        console.log(date)
        setEndTime(date)
    }



    return (
        <div>
            <h2>예약 등록</h2>

            <MyDatePicker
                selected={startDay}
                minDate={now}
                onChange={date => setStartDayEvent(date)}
                dateFormat="yyyy년 MM월 dd일"
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
            />
            <MyDatePicker
                selected={endTime}
                onChange={date => setEndTimeEvent(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                // timeCaption="Time"
                dateFormat="aa hh:mm 종료"
                placeholderText="종료 시간"
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