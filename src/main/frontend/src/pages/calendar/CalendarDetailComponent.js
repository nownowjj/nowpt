import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {deleteRecord, getMyDetailCalendar} from "../../api/CalendarApi";
import {useNavigate} from "react-router-dom";
import CalendarDetailContentWrap from "./component/CalendarDetailContentWrap";
import LoadingComponent from "../LoadingComponent";
import ggwak from "../../assets/ggwak-removebg-preview.png"

const CalendarDetailComponent = (data) => {
    const navigate = useNavigate();
    const [detail,setDetail] = useState([]);
    let recordDate = data.detailDay;
    console.log("상세 진입 : ",data);
    const [deleteCount, setDeleteCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    let param = {};
    param.recordDate = data.detailDay;
    useEffect(()=>{
        getMyDetailCalendar(param)
            .then(response => {
                setDetail(response.data)
                setIsLoading(false);
            }).catch(error => {
                console.log(error);
        })
    },[deleteCount])


    let deleteParam = {};
    const removeRecord =(calendarSn)=>{
        deleteParam.calendarSn = calendarSn;
        deleteRecord(deleteParam)
            .then(response =>{
                if(response.data) {
                    setDeleteCount(prevCount => prevCount + 1);
                }
            }).catch(error =>{navigate("/go/login");})
    }

    return (
        <CalendarDetailWrap>
            {/* 상단 */}
            <CalendarDetailDim onClick={data.noDetail}/>
            {/* 상단 */}

            {/* 하단*/}
            <CalendarDetail>
                {isLoading ? (
                    <LoadingComponent/>
                ) :
                detail && detail.length > 0 ? (
                    detail.map((data) => (
                        <CalendarDetailContentWrap
                            key={data.calendarSn}
                            data={data}
                            navigate={navigate}
                            recordDate={recordDate}
                            removeRecord={removeRecord}
                        />
                    ))
                ) : (
                    <CalendarDetailNo>
                        <img src={ggwak}/>
                    </CalendarDetailNo>
                )}
              <CalendarRecordAdd onClick={()=> navigate('/calendarRecordNewOrFix',{state : {"recordDate" : recordDate} })}>+</CalendarRecordAdd>
            </CalendarDetail>
            {/* 하단*/}
        </CalendarDetailWrap>
    );
};



const CalendarDetailWrap = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    // box-sizing
    z-index:100;
`
const CalendarDetailDim = styled.div`
    background:#e8e8e8;
    width:100%;
    height:10%;
    opacity: 0.8;
    z-index:100;
    position:relative;
`
const CalendarDetail = styled.div`
    width:100%;
    height:90%;
    background:white;
`

const CalendarDetailNo = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background:white;
`

const CalendarRecordAdd = styled.div`
    position:fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius:50%;
    background:skyblue;
    font-size: 40px;
    line-height: 100%;
    text-align: center;
    cursor:pointer;
    color:white;
    &:hover{
    color:#4486ce;
    }
    
`

export default CalendarDetailComponent;