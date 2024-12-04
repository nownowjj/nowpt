import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";
import CalendarDetailContentComponent from "./CalendarDetailContentComponent";
import {deleteRecord, getMyDetailCalendar} from "../../../api/CalendarApi";
import {route} from "../../../services/remocon";
import CalendarDetailNo from "./CalendarDetailNo";
import {CalendarDto, ScheduleDetailType} from "../../../model/CalendarApiModel";
import {useQuery} from "react-query";
import DetailLoadingComponent from "../../../component/DetailLoadingComponent";
import {getY_m_dDay, getYmDay} from "../../../services/formattingDay";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store/store";
import DetailSchedule from "../Schedule/DetailSchedule";
import {getData} from "../../../api/Api";
import {useCustomQueryClient} from "../../../hooks/useCustomQueryClient";
import CalendarLayout from "../Layout/CalendarLayout";
import {AiFillEdit} from "react-icons/ai";
import {JSInterface} from "../../../hooks/JSInterface";

const CalendarDayDetailPage = () => {
    const navigate = useNavigate();
    const { invalidateQueries } = useCustomQueryClient();
    const {state} = useLocation();
    const {detailDay , schedule} = state;

    const yearHolidays = useSelector((state: RootState) => state.calendar.yearHolidaysJson);
    const [detailSchedule, setDetailSchedule] = useState<ScheduleDetailType[]>([]);

    const [loadingSize , setLoadingSize] = useState(0);

    const loadingCallback = (data:CalendarDto[]) => {
        setLoadingSize(data.length);
    };

    const {isFetching , data:detail } = useQuery(["getDayDetail"], () => getData(getMyDetailCalendar , {"recordDate":detailDay} , 200, loadingCallback), {
        cacheTime: 0,
    });

    const handleShowToast = () => {
        JSInterface.showToast('Hello from React!',"3");
    };


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
        <CalendarLayout gnbTitle={getY_m_dDay(detailDay)} useBottom={false}>
            <CalendarDetailWrap>
                <DetailSchedule data={detailSchedule} />
                <CalendarDetail>
                    {
                      isFetching ?
                          <DetailLoadingComponent size={loadingSize}/>
                          :
                          detail && detail.length > 0 ?
                              <React.Fragment>
                                {detail.map((data) => (
                                    <CalendarDetailContentComponent
                                        key={data.calendarSn}
                                        data={data}
                                        removeRecord={removeRecord}
                                        importPage={false}
                                    />
                                ))}
                              </React.Fragment>
                          :
                            <CalendarDetailNo/>
                    }
                    <button onClick={()=>handleShowToast()}>ㅁㅇㄴㅁㄴㅇㅁㅇㄴ</button>
                    <CalendarRecordAdd onClick={()=> navigate(route.calendarRecordNewOrFix,{state : {"recordDate" : detailDay} })}>+</CalendarRecordAdd>
                </CalendarDetail>
            </CalendarDetailWrap>
        </CalendarLayout>
    );
};


const CalendarDetail = styled.div`
    width:100%;
    height:fit-content;
    background:white
`
const CalendarDetailWrap = styled.div`
    position:relative;
    width:100%;
    height:100%;
    padding-top: 55px;
`

const CalendarRecordAdd = styled(AiFillEdit)`
    z-index: 2;
    position: fixed;
    right: 3%;
    bottom: 50px;
    font-size: 50px;
    border-radius: 50%;
    border: 1px solid #e8e8e8;
    color: #373636;
    background: white;
    padding: 10px;
`
export default CalendarDayDetailPage;