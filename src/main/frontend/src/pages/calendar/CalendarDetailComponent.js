import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {deleteRecord, getMyDetailCalendar} from "../../api/CalendarApi";
import {useNavigate} from "react-router-dom";

const CalendarDetailComponent = (data) => {
    const navigate = useNavigate();
    const [detail,setDetail] = useState([]);
    const recordDate = data.detailDay;

    let param = {};
    param.recordDate = data.detailDay;
    useEffect(()=>{
        getMyDetailCalendar(param)
            .then(response => {
                console.log(response);
                setDetail(response.data)
            }).catch(error => {
                console.log(error);
        })
    },[])


    let deleteParam = {};
    const removeRecord =(calendarSn)=>{
        deleteParam.calendarSn = calendarSn;
        deleteRecord(deleteParam)
            .then(response =>{
                console.log(response);
            }).catch(error =>{
                console.log(error);
        })
    }

    return (
        <CalendarDetailWrap>
            {/* 상단 */}
            <CalendarDetailDim onClick={data.noDetail}/>
            {/* 상단 */}
            {/* 하단*/}
            <CalendarDetail>
                <div>
                    {detail && detail.map((data)=>{
                        return(
                            <div key={data.calendarSn}>
                                <div>{data.title}</div>
                                <div>{data.content}</div>
                                <div>{data.frstRegistDt}</div>
                                <div>{data.lastChangeDt}</div>
                                <button onClick={()=> navigate('/calendarRecordNewOrFix',{state : {"recordDate" : recordDate ,  "sn" : data.calendarSn , "content": data.content , "title":data.title } })}>수정</button>
                                <button onClick={()=> removeRecord(data.calendarSn)}>삭제</button>
                                <hr/>
                            </div>
                        )
                    })

                    }
                </div>

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
    box-sizing
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

const CalendarRecordAdd = styled.div`
    position:absolute;
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