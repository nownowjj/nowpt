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