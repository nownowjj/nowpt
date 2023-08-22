import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import LoadingComponent from "../../LoadingComponent";
import CalendarDetailContentComponent from "./CalendarDetailContentComponent";
import {deleteRecord, getMyDetailCalendar} from "../../../api/CalendarApi";
import ggwak from "../../../assets/ggwak-removebg-preview.png";
import moment from "moment/moment";
import {route} from "../../../services/remocon";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import CalendarDetailNo from "../component/CalendarDetailNo";

const CalendarDayDetailPage = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {detailDay} = state;
    const [isLoading, setIsLoading] = useState(true);
    const [detail,setDetail] = useState([]);

    let param ={
        "recordDate":detailDay
    }
    useEffect(()=>{
        getMyDetailCalendar(param)
            .then(response => {
                setDetail(response.data)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                ApiErrorHandle(navigate,error)
            }).finally(()=>{
            setIsLoading(false);
        })
    },[])

    let deleteParam = {};
    // 디테일 페이지에서 삭제 요청 수행
    const removeRecord =(calendarSn)=>{
        const recordIndex = detail.findIndex((data) => data.calendarSn === calendarSn); // 삭제 요청이 들어온 객체의 index를 찾음
        deleteParam.calendarSn = calendarSn; // 요청 파라미터에 Sn 저장
        deleteRecord(deleteParam)
            .then(response =>{
                if(response.data) {
                    if (recordIndex !== -1) { // 삭제 요청이 성공 되었고 해당 요소의 index를 찾음
                        const updatedDetail = [...detail]; // 새롭게
                        updatedDetail.splice(recordIndex, 1);
                        setDetail(updatedDetail);
                    }
                }
            }).catch(error =>{
            ApiErrorHandle(navigate,error);
            })
    }

    const importEvent =(calendarSn , newImportYn)=>{
        const recordIndex = detail.findIndex((data) => data.calendarSn === calendarSn); //
        detail[recordIndex].importYn = newImportYn;
    }


    return (
        <CalendarDetailWrap>
            <TopGnbComponent page={moment(detailDay).format('YYYY-MM-DD')}/>

            <CalendarDetail>
                {isLoading ?(
                        <LoadingComponent/>
                ): detail && detail.length > 0 ?(
                        <>
                        {detail.map((data) => (
                            <CalendarDetailContentComponent
                                key={data.calendarSn}
                                data={data}
                                navigate={navigate}
                                recordDate={detailDay}
                                removeRecord={removeRecord}
                                importEvent={importEvent}
                            />
                        ))}
                            <DetailNoBalloon leftSize="73%">일정을 추가 등록 하세요!</DetailNoBalloon>
                        </>
                    ): (
                        <>
                        <DetailNoBalloon leftSize="77%">버튼을 눌러 일정을 등록 하세요!</DetailNoBalloon>
                        <CalendarDetailNo/>
                        </>
                )}
                <CalendarRecordAdd onClick={()=> navigate(route.calendarRecordNewOrFix,{state : {"recordDate" : detailDay} })}>+</CalendarRecordAdd>
            </CalendarDetail>
        </CalendarDetailWrap>
    );
};
const CalendarDetail = styled.div`
    width:100%;
    height:fit-content;
    background:white;
    padding-top:50px;
    
`
const CalendarDetailWrap = styled.div`
    position:relative;
    width:100%;
    height:100%;
`

const DetailNoBalloon = styled.div`
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
    // left: 77%;
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