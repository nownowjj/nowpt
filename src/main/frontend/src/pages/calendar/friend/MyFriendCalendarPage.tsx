import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getMyFriendCalendar} from "../../../api/friendApi";
import {useInView} from "react-intersection-observer";
import {CalendarDto} from "../../../model/CalendarApiModel";
import {ImportWrap, ObserverArea} from "../Import/CalendarImportPage";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import LoadingComponent from "../../LoadingComponent";
import CalendarDetailContentComponent from "../Detail/CalendarDetailContentComponent";
import CalendarDetailNo from "../component/CalendarDetailNo";
import CalendarBottomMenu from "../Bottom/CalendarBottomMenu";
import ApiErrorHandle from "../../../services/ApiErrorHandle";

const MyFriendCalendarPage = () => {
    const {state} = useLocation();
    const [ref, inView] = useInView();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const[pageNumber,setPageNumber] = useState<number>(0);
    const [importRecordList,setImportRecordList] = useState<CalendarDto[]>([]);
    const lastRef = useRef(false);

    useEffect(()=>{
         getMyFriendCalendar(state.friendInfo.friendMemberSn , pageNumber)
             .then(response => {
                 if(!lastRef.current) {
                     if (response.data.first && response.data.last) {
                         lastRef.current = true;
                         return response.data.content;
                     }
                     if(response.data.last)  lastRef.current = true;
                     return response.data.content;
                 }
             }).then((content:CalendarDto[] | undefined) =>{
             if (content) setImportRecordList((prevData) => prevData.concat(content));
         }).catch(error => {
             ApiErrorHandle(error);
         }).finally(()=>{
             setIsLoading(false)
         });
    },[pageNumber]);

    useEffect(()=>{
        if(importRecordList.length !== 0 && inView) {
            console.log('첫 로딩 이후 무한 스크롤');
            if (lastRef.current) return;
            setPageNumber(prevNumber => prevNumber + 1)
        }
    },[inView,importRecordList]);
    return (
        <>
            {/* 상단 gnb */}
            <TopGnbComponent
                page={`${state.friendInfo.friendNm}님의 기록`}
                friendProfile={state.friendInfo.friendProfile}

            />
            {/* 반복 출력시킬 element 영역 */}
            <ImportWrap>
                {isLoading ? (
                        <LoadingComponent/>
                    ) :
                    importRecordList && importRecordList.length > 0 ? (
                        importRecordList.map((data) => (
                            <CalendarDetailContentComponent
                                key={data.calendarSn}
                                data={data}
                                removeRecord={()=>{}}
                                importPage={true}
                                importEvent={()=>{}}
                                friendPage={true}
                            />
                        ))

                    ) : (
                        <CalendarDetailNo/>
                    )}
                {/*  스크롤 하단 감지 영역  */}
                <ObserverArea ref={ref} />
                {/*  스크롤 하단 감지 영역  */}
            </ImportWrap>
            {/* 반복 출력시킬 element 영역 */}




            {/* 하단 메뉴 */}
            {/*<CalendarBottomMenu/>*/}
            {/* 하단 메뉴 */}
            {/* 상단 gnb */}  
        </>
    );
};

export default MyFriendCalendarPage;