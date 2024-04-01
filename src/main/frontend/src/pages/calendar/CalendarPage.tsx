import React, {useEffect, useState} from 'react'
import CalendarLib from 'react-calendar'
import '../../styles/calendarCss/cal.css' // css import
import DotsComponent from "./Detail/DotsComponent";
import ProfileComponent from "../../component/ProfileComponent";
import CalendarHeaderBannerComponent from "./Banner/CalendarHeaderBannerComponent";
import CalendarBottomMenu from "./Bottom/CalendarBottomMenu";
import {getMyCalendar, getMySchedule} from "../../api/CalendarApi";
import {useNavigate} from "react-router-dom";
import {route} from "../../services/remocon";
import FriendAndNotificationArea from "./TopGnb/FriendAndNotificationArea";
import styled from "styled-components";
import {RecordDate, ScheduleDetailType, ScheduleType} from "../../model/CalendarApiModel";
import {Value} from "react-calendar/src/shared/types";
import {OnArgs} from "react-calendar/dist/cjs/shared/types";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store/store";
import {setDay, setYearHolidays} from "../../redux/slice/calendarSlice";
import {useQuery} from "react-query";
import holidaysJsonFile from "../../db/holiday.json"
import {getFirstOrLastMonthYear, getYDay, getYmDay, getYmdDay} from "../../services/formattingDay";


const CalendarPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedDay = useSelector((state: RootState) => state.calendar.selectedDay);
    const yearHolidays = useSelector((state: RootState) => state.calendar.yearHolidaysJson);
    const [value,onChange] = useState<Value>(new Date(selectedDay));  //라이브러리 내장 Type 사용
    const [month , setMonth] = useState("");
    const holidaysJson:ScheduleType = holidaysJsonFile;

    // 월이 변경 될 경우
    const handleMonthChange = ({ activeStartDate }: OnArgs) => {
        const date =activeStartDate as Date;
        if(getYDay(selectedDay) !== getYDay(date)){
            dispatch(setYearHolidays({ year: getYDay(date), holidays: holidaysJson[getYDay(date)] }));
        }
        // dispatch(setDay(date));
        setMonth(getYmDay(date));
    }

    const tileContent = ({ date }: { date: Date }) => {
        if (holidaysJson.hasOwnProperty(getYDay(date))) {
            const loopDate =getYmdDay(date);
            // console.log(loopDate);
            const holidayData = yearHolidays.filter((holiday: { startDate: string ; endDate: string ; }) => {
                const holidayStart = holiday.startDate
                const holidayEnd =holiday.endDate
                return loopDate >= holidayStart && loopDate <= holidayEnd;
            }) .map(({ title, color }) => ({ title, color }));
            if(recordData ||holidayData )  return <DotsComponent date={date} mark={recordData} schedule={holidayData} customSchedule={customSchedule} />;
        }
        if(recordData)  return <DotsComponent date={date} mark={recordData} />;
    }

    const param: RecordDate = { recordDate: month ? month : getYmDay(value as Date)};
    const {data:recordData=[]} = useQuery({
        queryKey: ['myCalendar', param.recordDate],
        queryFn: async () => {
            const result = await getMyCalendar(param);
            return result.data;
        },
        // cacheTime: 60000, // 1분 동안 캐시로 저장
        staleTime: Infinity, // 캐시된 결과를 무기한으로 사용
    });

    const {data:customSchedule} = useQuery({
        queryKey: ['mySchedule', param.recordDate],
        queryFn: async () => {
            const result = await getMySchedule(param);
            console.log(result.data);
            return result.data;
        },
        // cacheTime: 60000, // 1분 동안 캐시로 저장
        staleTime: Infinity, // 캐시된 결과를 무기한으로 사용
    });

    // 일자 클릭
    const onClickDay =(date:Date)=> {
        console.log("일변경@!@!");
        dispatch(setDay(date));
        let filteredSchedule: ScheduleDetailType[]|null;
        if(customSchedule) {
            filteredSchedule = customSchedule.filter(schedule => {
                const startDate = schedule.startDate;
                const endDate = schedule.endDate;
                return startDate <= getYmdDay(date) && endDate >= getYmdDay(date);
            });
        }

        // @ts-ignore
        navigate(route.calendarDayDetail, { state: { detailDay: getYmdDay(date) , schedule:filteredSchedule }  });
    }

    useEffect(() => {
        if(holidaysJson.hasOwnProperty(getYDay(value as Date))){ // 공휴일 json 데이터에 보고 있는 연도 데이터가 존재 하는지 체크

            dispatch(setYearHolidays({ year: getYDay(value as Date), holidays: holidaysJson[getYDay(value as Date)] })); //연도와 공휴일 데이터를 넘긴다 , 이미 넘긴 연도라면 함수 종료
        }
    }, [getYDay(value as Date)]);


    useEffect(() => {
        console.log(month , '월 변경 감지');
        console.log(getFirstOrLastMonthYear(value as Date));
    }, [month]);

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
                onClickDay={onClickDay}
                formatDay={(locale, date) => dayjs(date).format('DD')}
                value={value} // 일자
                tileContent={tileContent}
                showNeighboringMonth={true} // 해당 월 일자만 보여줄지
                onActiveStartDateChange={handleMonthChange} // 월 변경 이벤트
                calendarType={"gregory"}
                onChange={onChange}
                // onChange={changeValue}
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