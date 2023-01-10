import React, {useEffect} from 'react';
import styled from "styled-components";
import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {getNotice} from "../../api/NoticeApi";
import {getReservation} from "../../api/ReservationApi";
import dayjs from "dayjs";
import Button from "../../component/JoinButton";

const MeetingListComponent = ({data}) => {
    // 일주일 리미트 셋
    // 검색 시작날짜인데 일자를 크게 두면 DB에 무리가 갈수 있으므로
    // 현재 날짜에서 일주일을 뺀 날짜로 startDate를 set해준다
    let date = new Date();
    date.setDate(date.getDate()+7);

    // 시작 날짜 JS Date 현재 날짜
    const [startDate, setStartDate] = useState(new Date());
    // 마지막 날짜 Date+7 현재로부터 7일뒤까지
    const [endDate, setEndDate] = useState(date);

    // 예약 리스트
    const [reservationList,setReservationList] = useState([]);

    const setStartDateEvent=(date)=>{
        setStartDate(date);
    }

    const setEndDateEvent=(date)=>{
        setEndDate(date);
    }

    useEffect(()=>{
        console.log("페이지 컴포넌트 data : " ,data)
        getReservation()
            .then(response => {
                console.log(response);
                setReservationList(response.content);
            }).catch(error =>{
            console.log(error)
        });
    },[data])

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


            <table>
                <thead>
                <tr>
                    <th>예약 Sn</th>
                    <th>회의실</th>
                    <th>사용일자</th>
                    <th>시작시간</th>
                    <th>종료시간</th>
                    <th>등록 시간</th>
                    <th>수정 시간</th>
                    <th>등록자</th>
                    <th>사용목적</th>
                </tr>
                </thead>
                <tbody>

                {reservationList && reservationList.map((list) => {
                    return (
                        <tr key={list.reservationSn}>

                            <td>{list.reservationSn}</td>
                            <td>{list.meetingRoom}</td>
                            <td>{list.useDay}</td>
                            <td>{(dayjs(list.useStartTime).format('HH시mm분 A'))}</td>
                            <td>{(dayjs(list.useEndTime).format('HH시mm분 A'))}</td>
                            <td>{(dayjs(list.frstRegistDt).format('YYYY년MM월DD일 HH시mm분 A'))}</td>
                            <td>{(dayjs(list.lastChangeDt).format('YYYY년MM월DD일 HH시mm분 A'))}</td>
                            <td>{list.memberSn.membNm}</td>
                            <td>{list.purpose}</td>
                            {/*<td><Button onClick={() => {noticeUpdate(list.noticeSn)}} value="수정"/></td>*/}
                        </tr>
                    );
                })}





                </tbody>
            </table>


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