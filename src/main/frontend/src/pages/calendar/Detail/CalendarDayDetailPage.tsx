import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import CalendarDetailContentComponent from "./CalendarDetailContentComponent";
import {deleteRecord, getMyDetailCalendar} from "../../../api/CalendarApi";
import {route} from "../../../services/remocon";
import CalendarDetailNo from "../component/CalendarDetailNo";
import {CalendarSnParam, RecordDate, ScheduleDetailType} from "../../../model/CalendarApiModel";
import {useQuery, useQueryClient} from "react-query";
import DetailLoadingComponent from "../../../component/DetailLoadingComponent";
import {getY_m_dDay, getYmDay} from "../../../services/formattingDay";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store/store";
import DetailSchedule from "./DetailSchedule";
import {getData} from "../../../api/Api";
import {useCustomQueryClient} from "../../../hooks/useCustomQueryClient";

const CalendarDayDetailPage = () => {
    const navigate = useNavigate();
    const { invalidateQueries } = useCustomQueryClient();
    const {state} = useLocation();
    const {detailDay , schedule} = state;

    const yearHolidays = useSelector((state: RootState) => state.calendar.yearHolidaysJson);
    const [detailSchedule, setDetailSchedule] = useState<ScheduleDetailType[]>([]);

    const {isLoading , data:detail } = useQuery(["getDayDetail"], () => getData(getMyDetailCalendar , {"recordDate":detailDay} , 300), {
        cacheTime: 0,
    });



    // 디테일 페이지에서 삭제 요청 수행
    const removeRecord =async (calendarSn:number)  =>{
        const data = await getData(deleteRecord , {calendarSn:calendarSn})
        data && invalidateQueries(['getDayDetail'], ['myCalendar', getYmDay(detailDay)]);
    }

    useEffect(() => {
        let holidayData = yearHolidays.filter((holiday: { startDate: string ; endDate: string ; }) => {
            const holidayStart = holiday.startDate
            const holidayEnd =holiday.endDate
            return detailDay >= holidayStart && detailDay <= holidayEnd;
        });

        if(schedule.length > 0) holidayData.push(...schedule);
        setDetailSchedule(holidayData);
    }, []);

    return (
        <CalendarDetailWrap>
            <TopGnbComponent page={getY_m_dDay(detailDay)}/>
            <DetailSchedule data={detailSchedule} />

            <CalendarDetail>
                {
                  isLoading ? <DetailLoadingComponent size={3}/> :
                  detail && detail.length > 0 ?
                        <>
                        {detail.map((data) => (
                            <CalendarDetailContentComponent
                                key={data.calendarSn}
                                data={data}
                                removeRecord={removeRecord}
                                importPage={false}
                            />
                        ))}
                            <DetailNoBalloon leftSize="73%">일정을 추가 등록 하세요!</DetailNoBalloon>
                        </>
                    :
                        <>
                        <DetailNoBalloon leftSize="77%">버튼을 눌러 일정을 등록 하세요!</DetailNoBalloon>
                        <CalendarDetailNo/>
                        </>


                }
                <CalendarRecordAdd onClick={()=> navigate(route.calendarRecordNewOrFix,{state : {"recordDate" : detailDay} })}>+</CalendarRecordAdd>
            </CalendarDetail>



        </CalendarDetailWrap>
    );
};


const CalendarDetail = styled.div`
    width:100%;
    height:fit-content;
    background:white;
`
const CalendarDetailWrap = styled.div`
    position:relative;
    width:100%;
    height:100%;
    padding-top: 55px;
`

interface DetailNoBalloonProps{
    leftSize:string;
}
const DetailNoBalloon = styled.div<DetailNoBalloonProps>`
    z-index:100;
    position: fixed;
    background: skyblue;
    color: #fff;
    padding: 10px;
    border-radius: 20rem;
    bottom: 79px;
    right: 9px;
    font-size: 10pt;
    box-shadow: 2px 2px 3px #d1d1d1;
  
  &::after {
    transform: translate(-1px,3px);
    left : ${({leftSize}) => (leftSize ? `${leftSize}` : `72%` )} ;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(56,77,157,0);
    border-top-color: skyblue;
    border-width: 11px;
    top: 92%;
}
`

const CalendarRecordAdd = styled.div`
    position:fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    line-height: 50px;
    height: 50px;
    border-radius:50%;
    background:skyblue;
    font-size: 40px;
    text-align: center;
    cursor:pointer;
    color:white;
    &:hover{
    color:#4486ce;
    }
    
`
export default CalendarDayDetailPage;