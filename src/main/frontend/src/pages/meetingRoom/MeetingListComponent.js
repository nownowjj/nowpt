import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {getReservation} from "../../api/ReservationApi";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
// import relativeTime from 'dayjs/plugin/relativeTime';
import ko from "date-fns/locale/ko";
import roomData from "../../db/MeetingRoomData.json";
import isId from "../../services/isId";
import Button from "../../component/JoinButton";
import {useNavigate} from "react-router-dom";

const MeetingListComponent = ({data}) => {
    const navigate = useNavigate();
    dayjs.locale('ko');
    registerLocale("ko", ko);
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

    const [room , setRoom] = useState("대회의실");

    const [id] = useState(isId())

    const setStartDateEvent=(date)=>{
        setStartDate(date);
    }

    const setEndDateEvent=(date)=>{
        setEndDate(date);
    }

    const handleRoomChange = (e) => {
        setRoom(e.target.value);
        console.log(e.target.value);
    };

    const reservationUpdate = reservationSn =>{
        console.log("클릭 이벤트" + reservationSn);
        navigate("/go/meetingRoom/"+reservationSn);
    }


    useEffect(()=>{

        // 예약이 새롭게 등록되면 (등록 컴포넌트) > 페이지 > (리스트 컴포넌트)로 증가된 data = 0..1..2가 들어옴
        // console.log("페이지 컴포넌트 data : " ,data)

        let paramStart =(startDate.getFullYear() + '-' + (startDate.getMonth() + 1).toString().padStart(2, '0') + '-' + startDate.getDate().toString().padStart(2, '0'));
        let paramEnd =(endDate.getFullYear() + '-' + (endDate.getMonth() + 1).toString().padStart(2, '0') + '-' + endDate.getDate().toString().padStart(2, '0'));

        let paramDto = {
            "startDay":paramStart,
            "endDay":paramEnd,
            "room":room
        }
        console.log("페이지 파라미터 %O",paramDto);

        getReservation(paramStart,paramEnd,room)
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
                locale="ko"
                selected={startDate}
                onChange={(date) => setStartDateEvent(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy년 MM월 dd일(eee)"
                maxDate={endDate}
            />
            <MyDatePicker
                locale="ko"
                selected={endDate}
                onChange={(date) => setEndDateEvent(date)}
                selectsEnd
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy년 MM월 dd일(eee)"
            />

            <select onChange={handleRoomChange}>
                {roomData.meetingRoom.map((room) => (
                    <option key={room.id}
                            value={room.value}
                    >
                        {room.roomName}
                    </option>
                ))}
            </select>

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
                    <th>수정</th>
                </tr>
                </thead>
                <tbody>

                {reservationList && reservationList.map((list) => {
                    return (
                        <tr key={list.reservationSn}>

                            <td>{list.reservationSn}</td>
                            <td>{list.meetingRoom}</td>
                            <td>{dayjs(list.useDay).format("YYYY년 MM월 DD일(ddd)")}</td>
                            <td>{(dayjs(list.useStartTime).format('HH시mm분 A'))}</td>
                            <td>{(dayjs(list.useEndTime).format('HH시mm분 A'))}</td>
                            <td>{(dayjs(list.frstRegistDt).format('YYYY년 MM월 DD일 ddd HH시mm분 A'))}</td>
                            {
                                list.frstRegistDt === list.lastChangeDt
                                ?
                                    <td>수정하지 않았음</td>
                                    :
                                    <td>{(dayjs(list.lastChangeDt).format('YYYY년MM월DD일 HH시mm분 A'))}</td>
                            }
                            <td>{list.memberSn.membNm}</td>
                            <td>{list.purpose}</td>
                            {
                                list.memberSn.membId === id
                                ? <td><Button onClick={() => {reservationUpdate(list.reservationSn)}} value="수정"/></td>
                                : <td>x</td>
                            }
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