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
import {RecordDate} from "../../model/CalendarApiModel";
import {Value} from "react-calendar/src/shared/types";
import {OnArgs} from "react-calendar/dist/cjs/shared/types";


const CalendarPage = () => {

    const [value, onChange] = useState<Value>(new Date());  //라이브러리 내장 Type 사용
    const [mark , setMark] = useState<string[]>([]);
    const [month , setMonth] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const param: RecordDate = { recordDate: month ? month : moment(value as Date).format('YYYYMM')};
        // const param: RecordDate = { recordDate: month ? month : moment(dateValue).format('YYYYMM')};
        getMyCalendar(param)
            .then(response =>{
                setMark(response.data as string[])
            })
            .catch(error =>{ApiErrorHandle(error)})
    },[month])

    const onClickDay =(date:Date)=> {
        const formattedDate = moment(date).format('YYYYMMDD');
        // navigate(route.calendarDayDetail,{state:{"detailDay": moment(value).format('YYYYMMDD')}});
        navigate(route.calendarDayDetail, { state: { detailDay: formattedDate } });
    }

    // 월이 변경 될 경우
    // const handleMonthChange = (date: { activeStartDate: Date }) => {
    const handleMonthChange = ({ activeStartDate }: OnArgs) => {
        const formattedDate = moment(activeStartDate).format('YYYYMM');
        setMonth(formattedDate);
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
            <CalendarLib
                onChange={onChange}
                onClickDay={onClickDay}
                formatDay={(locale, date) => moment(date).format('DD')}
                value={value} // 일자
                tileContent={({ date }) => <DotsComponent date={date} mark={mark} />} // 일자 하단에 이벤트 dot
                showNeighboringMonth={true} // 해당 월 일자만 보여줄지
                onActiveStartDateChange={handleMonthChange} // 월 변경 이벤트
                calendarType={"US"}
            />
            {/* 캘린더 */}

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