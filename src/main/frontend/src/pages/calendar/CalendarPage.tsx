import React, {useEffect, useState} from 'react'
import CalendarLib from 'react-calendar'
import '../../styles/calendarCss/cal.css' // css import
import moment from 'moment';
import DotsComponent from "./Detail/DotsComponent";
import ProfileComponent from "../../component/ProfileComponent";
import CalendarHeaderBannerComponent from "./Banner/CalendarHeaderBannerComponent";
import CalendarBottomMenu from "./Bottom/CalendarBottomMenu";
import {getMyCalendar} from "../../api/CalendarApi";
import {useNavigate} from "react-router-dom";
import {route} from "../../services/remocon";
import ApiErrorHandle from "../../services/ApiErrorHandle";
import FriendAndNotificationArea from "./TopGnb/FriendAndNotificationArea";
import styled from "styled-components";

const CalendarPage = () => {
    const [value, onChange] = useState<Date>(new Date());
    const [mark , setMark] = useState([]);
    const [month , setMonth] = useState("");
    const navigate = useNavigate();


    // 월이 변경 될 경우
    const handleMonthChange = (date:string) => setMonth(moment(date.activeStartDate).format('YYYYMM'));

    let param = {};
    useEffect(()=>{
        param.recordDate = month ? month : moment(value).format('YYYYMM');  // 페이지 로드 시점 param : value  월 변경 이벤트 발생하면 param : month
        getMyCalendar(param)
            .then(response =>{setMark(response.data)})
            .catch(error =>{ApiErrorHandle(navigate,error)})
    },[month])

    const onClickDay =(value)=> {
        navigate(route.calendarDayDetail,{state:{"detailDay": moment(value).format('YYYYMMDD')}})
    }

    return (
        <CalendarWrap>
            {/* 배너*/}
            <CalendarHeaderBannerComponent />
            {/* 배너*/}

            {/*헤더*/}
            <div className="header">
                <ProfileComponent naviUse={true} size={45}/>
                <FriendAndNotificationArea/>
            </div>
            {/*헤더*/}

            {/* 캘린더 */}
            <CalendarLib  // class  = "react-calendar"
                onChange={onChange}
                onClickDay={onClickDay}
                formatDay={(locale, date) => moment(date).format('DD')}
                value={value} // 일자
                tileContent={({date}) => <DotsComponent date ={date} mark={mark} />} // 일자 하단에 이벤트 dot
                showNeighboringMonth={true} // 해당 월 일자만 보여줄지
                onActiveStartDateChange={handleMonthChange} // 월 변경 이벤트
                calendarType={"US"}
                // onViewChange={onViewChange}
                // onClickMonth={onClickMonth}
                // minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                // maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            />
            {/* 캘린더 */}


            {/*<div>이번달에 {mark.length}번 기록했어요!!</div>*/}

            {/*바텀*/}
            <CalendarBottomMenu/>
            {/*바텀*/}


        </CalendarWrap>
    );
};


const CalendarWrap = styled.div`
    width:100%;
    height:100%;
`
export default CalendarPage;