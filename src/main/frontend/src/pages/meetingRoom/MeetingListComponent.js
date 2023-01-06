import React from 'react';
import styled from "styled-components";
import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const MeetingListComponent = () => {
    // 일주일 리미트 셋
    // 검색 시작날짜인데 일자를 크게 두면 DB에 무리가 갈수 있으므로
    // 현재 날짜에서 일주일을 뺀 날짜로 startDate를 set해준다
    let date = new Date();
    date.setDate(date.getDate()+7);
    // 날짜
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(date);

    const setStartDateEvent=(date)=>{
        setStartDate(date);
    }

    const setEndDateEvent=(date)=>{
        setEndDate(date);
    }

    return (
        <div>
                <h2>예약 현황</h2>

            <MyDatePicker
                selected={startDate}
                // value='년도-월-일 선택'
                onChange={(date) => setStartDateEvent(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy년 MM월 dd일"
                maxDate={endDate}
            />
            <MyDatePicker
                selected={endDate}
                onChange={(date) => setEndDateEvent(date)}
                selectsEnd
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy년 MM월 dd일"
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

  @media (max-width: 768px) {
    width:97%;
    // margin
  };
`
export default MeetingListComponent;