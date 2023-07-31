import React, {useEffect, useState} from 'react';
import CalendarWrap from "../component/CalendarWrapComponent";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import CalendarBottomMenu from "../Bottom/CalendarBottomMenu";
import LoadingComponent from "../../LoadingComponent";
import CalendarDetailContentComponent from "../Detail/CalendarDetailContentComponent";
import {useNavigate} from "react-router-dom";
import {useInView} from "react-intersection-observer";
import styled from "styled-components";
import ggwak from "../../../assets/ggwak-removebg-preview.png";
import {deleteRecord, selectImportRecordPaging} from "../../../api/CalendarApi";
import {isNotLogin, route} from "../../../services/remocon";
import ApiErrorHandle from "../../../services/ApiErrorHandle";

const CalendarImportPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [ref, inView] = useInView();
    const[pageNumber,setPageNumber] = useState(0);
    const[last,setLast] = useState(false);
    const [importRecordList,setImportRecordList] = useState([]);


    useEffect(() => {
        selectImportRecordPaging(pageNumber)
            .then(response => {
                console.log(pageNumber + " response %O :" , response.data);

                if(!last) {
                    //첫번쨰 페이지이자 마지막 페이지 일 경우
                    if (response.data.first && response.data.last) {
                        console.log('첫번쨰이자 마지막임');
                        setLast(true);
                        return response.data.content;
                    }
                    if(response.data.last) setLast(true);
                    return response.data.content;
                }
        }).then(data =>{
            setImportRecordList((itemLists) => itemLists.concat(data));
        }).catch(error => {
            ApiErrorHandle(navigate,error);
        }).finally(()=>{
            setIsLoading(false)
        });
    }, [pageNumber]);


    useEffect(()=>{
        if(importRecordList.length !== 0 && inView) {
            console.log('첫 로딩 이후 무한 스크롤');
            if (last) return;
            setPageNumber(pageNumber + 1)
        }
    },[inView]);

    let deleteParam = {};
    // 디테일 페이지에서 삭제 요청 수행
    const removeRecord =(calendarSn)=>{
        const recordIndex = importRecordList.findIndex((data) => data.calendarSn === calendarSn); // 삭제 요청이 들어온 객체의 index를 찾음
        deleteParam.calendarSn = calendarSn; // 요청 파라미터에 Sn 저장
        deleteRecord(deleteParam)
            .then(response =>{
                if(response.data) {
                    if (recordIndex !== -1) { // 삭제 요청이 성공 되었고 해당 요소의 index를 찾음
                        const updatedDetail = [...importRecordList]; // 새롭게
                        updatedDetail.splice(recordIndex, 1);
                        setImportRecordList(updatedDetail);
                    }
                }
            }).catch(error =>{
                ApiErrorHandle(navigate,error)
        })
    }

    const importEvent =(calendarSn , newImportYn)=>{
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
                {isLoading ? (
                        <LoadingComponent/>
                    ) :
                    importRecordList && importRecordList.length > 0 ? (
                        importRecordList.map((data) => (
                            <CalendarDetailContentComponent
                                key={data.calendarSn}
                                data={data}
                                navigate={navigate}
                                importPage={true}
                                removeRecord={removeRecord}
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

const CalendarDetailNo = styled.div`
    width:100%;
    height:600px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:white;
    background-image: url(${ggwak});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    position:relative;
`
const ImportWrap =styled.div`
    height: fit-content;
    padding-top: 50px;
    padding-bottom: 50px;
    width:100%;
`

const ObserverArea = styled.div`
    width:1px;
    border-bottom:1px solid #e8e8e8;
`

export default CalendarImportPage;