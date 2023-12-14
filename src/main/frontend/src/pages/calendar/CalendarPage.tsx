import React, {useState} from 'react'
import CalendarLib from 'react-calendar'
import '../../styles/calendarCss/cal.css' // css import
import DotsComponent from "./Detail/DotsComponent";
import ProfileComponent from "../../component/ProfileComponent";
import CalendarHeaderBannerComponent from "./Banner/CalendarHeaderBannerComponent";
import CalendarBottomMenu from "./Bottom/CalendarBottomMenu";
import {getMyCalendar} from "../../api/CalendarApi";
import {useNavigate} from "react-router-dom";
import {route} from "../../services/remocon";
import FriendAndNotificationArea from "./TopGnb/FriendAndNotificationArea";
import styled from "styled-components";
import {RecordDate} from "../../model/CalendarApiModel";
import {Value} from "react-calendar/src/shared/types";
import {OnArgs} from "react-calendar/dist/cjs/shared/types";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store/store";
import {setDay} from "../../redux/slice/calendarSlice";
import {useQuery} from "react-query";
import holidaysJson from "../../db/holiday.json"

interface ScheduleType {
    [year: string]: {
        startDate: string;
        endDate: string;
        title: string;
    }[];
}

const CalendarPage = () => {
    const holidays:ScheduleType = holidaysJson;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedDay = useSelector((state: RootState) => state.calendar.selectedDay);

    const [value] = useState<Value>(new Date(selectedDay));  //라이브러리 내장 Type 사용
    const [month , setMonth] = useState("");



    const param: RecordDate = { recordDate: month ? month : dayjs(value as Date).format('YYYYMM')};
    const {data:recordData=[]} = useQuery({
        queryKey: ['myCalendar', param.recordDate],
        queryFn: async () => {
            const result = await getMyCalendar(param);
            return result.data;
        },
        // cacheTime: 60000, // 1분 동안 캐시로 저장
        staleTime: Infinity, // 캐시된 결과를 무기한으로 사용
        // refetchOnMount: false, // 마운트 시에만 새로고침
    });


    // 일자 클릭
    const onClickDay =(date:Date)=> {
        dispatch(setDay(date));
        const formattedDate = dayjs(date).format('YYYYMMDD');
        navigate(route.calendarDayDetail, { state: { detailDay: formattedDate } });
    }

    // 월이 변경 될 경우
    const handleMonthChange = ({ activeStartDate }: OnArgs) => {
        dispatch(setDay(activeStartDate as Date));
        const formattedDate = dayjs(activeStartDate).format('YYYYMM');
        setMonth(formattedDate);
    }

    const tileContent = ({ date }: { date: Date }) => {
        const loopDate =dayjs(date).format('YYYYMMDD');

        const yearHolidays = holidays[loopDate.substring(0,4)];

        if(yearHolidays){
            const holidayData = yearHolidays.filter((holiday: { startDate: string ; endDate: string ; }) => {
                const holidayStart = holiday.startDate
                const holidayEnd =holiday.endDate
                return loopDate >= holidayStart && loopDate <= holidayEnd;
            });

            const holidayTitles = holidayData.map((holiday: { title: string; }) => holiday.title);
            if(recordData ||holidayTitles )  return <DotsComponent date={date} mark={recordData} schedule={holidayTitles} />;
        }
    };


    return (
        <CalendarWrap>
            {/* 배너*/}
            <CalendarHeaderBannerComponent />
            {/* 배너*/}

            {/*헤더*/}
            <div className="header">
                <ProfileComponent naviUse={true} size={45} isMy={true}/>
                <FriendAndNotificationArea/>
            </div>
            {/*헤더*/}

            {/* 캘린더 */}
            <CalendarLib
                // onChange={onChange}
                // onChange={changeValue}
                onClickDay={onClickDay}
                formatDay={(locale, date) => dayjs(date).format('DD')}
                value={value} // 일자
                // tileContent={({ date }) => <DotsComponent date={date} mark={recordData} schedule={holidays} />} // 일자 하단에 이벤트 dot
                tileContent={tileContent}
                showNeighboringMonth={true} // 해당 월 일자만 보여줄지
                onActiveStartDateChange={handleMonthChange} // 월 변경 이벤트
                calendarType={"gregory"}
            />
            {/* 캘린더 */}
            
            {/* 신규 */}
            <NewArea>ㅇㅇㅇ</NewArea>
            {/* 신규 */}

            {/*바텀*/}
            <CalendarBottomMenu/>
            {/*바텀*/}
        </CalendarWrap>
    );
};

const NewArea = styled.div`
    margin: 20px 0 60px;
`

const CalendarWrap = styled.div`
    width:100%;
    //height:100%;
`
export default CalendarPage;