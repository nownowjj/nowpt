import React, {useEffect} from 'react';
import styled from "styled-components";
import CalendarDetailContentComponent from "../Detail/CalendarDetailContentComponent";
import {useInView} from "react-intersection-observer";
import {useInfiniteScrollQuery} from "./useInfiniteScrollQuery";
import DetailLoadingComponent from "../../../component/DetailLoadingComponent";
import CalendarLayout from "../Layout/CalendarLayout";
import {useCustomQueryClient} from "../../../hooks/useCustomQueryClient";
import {getData} from "../../../api/Api";
import {deleteRecord} from "../../../api/CalendarApi";

const CalendarImportPage = () => {
    const {invalidateQueries} = useCustomQueryClient();
    const { isLoading , isFetching,queryResult, getNextPage, getIsSuccess, getNextPageIsPossible } = useInfiniteScrollQuery();
    console.log(isLoading , isFetching ,queryResult  , getIsSuccess , getNextPageIsPossible);

    const [ref, isView] = useInView();
    useEffect(() => {
        if (isView && getNextPageIsPossible) {
            getNextPage();
        }
    }, [isView, queryResult]);

    const removeRecord =async (calendarSn:number)  =>{
        const data = await getData(deleteRecord , {calendarSn:calendarSn})
        data && invalidateQueries(['importRecord']);
    }


    return (
        <CalendarLayout gnbTitle={"중요한 일정"}>
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
                                removeRecord={removeRecord}
                            />
                        ))
                    )
                }
                {(!isLoading &&  getNextPageIsPossible )&& <div ref={ref}></div>}

            </ImportWrap>
        </CalendarLayout>
    );
};

export const ImportWrap =styled.div`
    height: fit-content;
    padding-top: 50px;
    padding-bottom: 50px;
    width:100%;
    //max-width: 720px;
    //margin: 0 auto;
`

export const ObserverArea = styled.p`
    width:1px;
    border-bottom:1px solid #e8e8e8;
`

export default CalendarImportPage;