import React, {useEffect, useRef, useState} from 'react';
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import CalendarBottomMenu from "../Bottom/CalendarBottomMenu";
import LoadingComponent from "../../LoadingComponent";
import CalendarDetailContentComponent from "../Detail/CalendarDetailContentComponent";
import {useInView} from "react-intersection-observer";
import styled from "styled-components";
import {deleteRecord, selectImportRecordPaging} from "../../../api/CalendarApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import CalendarDetailNo from "../component/CalendarDetailNo";
import {CalendarDto, CalendarSnParam} from "../../../model/CalendarApiModel";

const CalendarImportPage = () => {
    const [ref, inView] = useInView();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const[pageNumber,setPageNumber] = useState<number>(0);
    const [importRecordList,setImportRecordList] = useState<CalendarDto[]>([]);
    const lastRef = useRef(false);

    useEffect(() => {
        selectImportRecordPaging(pageNumber)
            .then(response => {
                console.log(response);
                console.log("???");
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
    }, [pageNumber]);


    useEffect(()=>{
        if(importRecordList.length !== 0 && inView) {
            console.log('첫 로딩 이후 무한 스크롤');
            if (lastRef.current) return;
            setPageNumber(prevNumber => prevNumber + 1)
        }
    },[inView,importRecordList]);


    const removeRecord =(calendarSn:number):void => {
        console.log(calendarSn+'??');
        const deleteParam:CalendarSnParam={calendarSn:calendarSn};
        const recordIndex = importRecordList.findIndex((data) => data.calendarSn === calendarSn); // 삭제 요청이 들어온 객체의 index를 찾음

        deleteRecord(deleteParam)
            .then(response =>{
                if(response.data) {
                    if (recordIndex !== -1) { // 삭제 요청이 성공 되었고 해당 요소의 index를 찾음
                        const updatedDetail = [...importRecordList]; // 새롭게
                        updatedDetail.splice(recordIndex, 1); //새로 복사한 객체에서 삭제한 index를 제거함
                        setImportRecordList(updatedDetail);
                    }
                }
            }).catch(error =>{
                ApiErrorHandle(error)
        })
    }

    const importEvent =(calendarSn:number , newImportYn:boolean)=>{
        const recordIndex = importRecordList.findIndex((data) => data.calendarSn === calendarSn); //
        importRecordList[recordIndex].importYn = newImportYn;
    }

    return (
        <>
            {/* 상단 gnb */}
            <TopGnbComponent page={'중요한 일정'}/>
            {/* 상단 gnb */}

            {/* 반복 출력시킬 element 영역 */}
            <ImportWrap>
                {
                    isLoading ? (<LoadingComponent/>)
                        :
                    importRecordList && importRecordList.length > 0 ? (
                        importRecordList.map((data) => (
                            <CalendarDetailContentComponent
                                key={data.calendarSn}
                                data={data}
                                removeRecord={removeRecord}
                                importPage={true}
                                importEvent={importEvent}
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
            <CalendarBottomMenu/>
            {/* 하단 메뉴 */}
        </>
    );
};

export const ImportWrap =styled.div`
    height: fit-content;
    padding-top: 50px;
    padding-bottom: 50px;
    width:100%;
`

export const ObserverArea = styled.p`
    width:1px;
    border-bottom:1px solid #e8e8e8;
`

export default CalendarImportPage;