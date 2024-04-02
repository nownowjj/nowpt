import React, {useEffect} from 'react';
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import CalendarBottomMenu from "../Bottom/CalendarBottomMenu";
import styled from "styled-components";
import CalendarDetailContentComponent from "../Detail/CalendarDetailContentComponent";
import {useInView} from "react-intersection-observer";
import {useInfiniteScrollQuery} from "./useInfiniteScrollQuery";
import DetailLoadingComponent from "../../../component/DetailLoadingComponent";

const CalendarImportPage = () => {

    const { isLoading , isFetching,queryResult, getNextPage, getIsSuccess, getNextPageIsPossible } = useInfiniteScrollQuery();
    console.log(isLoading , isFetching ,queryResult  , getIsSuccess , getNextPageIsPossible);

    const [ref, isView] = useInView();
    useEffect(() => {
        if (isView && getNextPageIsPossible) {
            getNextPage();
        }
    }, [isView, queryResult]);


    return (
        <>
            {/* 상단 gnb */}
            <TopGnbComponent page={'중요한 일정'}/>
            {/* 상단 gnb */}

            {/* 반복 출력시킬 element 영역 */}
            <ImportWrap>
                {
                    isLoading ? <DetailLoadingComponent size={4}/> :
                    getIsSuccess &&
                    queryResult?.pages.flatMap((page) =>
                        page.resultList.map((data) => (
                            <CalendarDetailContentComponent
                                key={data.calendarSn}
                                data={data}
                                importPage={true}
                            />
                        ))
                    )
                }
                {(!isLoading &&  getNextPageIsPossible )&& <div ref={ref}>!!</div>}

            </ImportWrap>
            {/* 반복 출력시킬 element 영역 */}
            {/* 무한 스크롤 옵저버 */}





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