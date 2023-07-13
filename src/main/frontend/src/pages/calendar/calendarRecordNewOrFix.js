import React, {useEffect, useState} from 'react';
import CalendarWrap from "./component/CalendarWrapComponent";
import styled from "styled-components";
import {insertRecord} from "../../api/CalendarApi";
import {useLocation, useNavigate} from 'react-router-dom'

const CalendarRecordNewOrFix = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    console.log(state);
    const isFix = !!state.sn;
    const initialTitle = state.sn ? state.title : "";       // Title ,Content가 존재한다면 input value를 지정해놓는다.
    const initialContent = state.sn ? state.content : "";
    const {recordDate} = state;
    const [titleValue , setTitleValue] = useState(initialTitle);
    const [contentValue , setContentValue] = useState(initialContent);

    let param = {};
        param.recordDate = recordDate;
        param.calendarSn = state.sn && state.sn ;


    const newRecordEvent=()=>{
        param.title   = titleValue;
        param.content = contentValue;

        insertRecord(param)  /*param sn의 존재 유무로 Update , Insert 구분*/
            .then(response =>{
                console.log(response);
                navigate('/calendar',{state : {"recordDate": response.recordDate , "isNewOrFix":true}})
            }).catch(error =>{
                console.log(error);
        })
    }

    const changeTitle=(e)=>setTitleValue(e.target.value);
    const changeContent=(e)=>setContentValue(e.target.value);

    return (
        <CalendarWrap>
            <CalendarRecordNewOrFixWrap>
                <CalendarBack onClick={()=> navigate(-1) }>◀</CalendarBack>

                <CalendarRecordAddArea>
                    <h3>New Record</h3>
                    <div>Title</div>
                    <input type="text" onChange={changeTitle} value={titleValue} />
                    <div>Content</div>
                    <input type="text" onChange={changeContent} value={contentValue}/>
                    <RecordButton onClick={newRecordEvent}>{isFix ? '수정' : '등록'}</RecordButton>
                </CalendarRecordAddArea>

            </CalendarRecordNewOrFixWrap>
        </CalendarWrap>
    );
};

const CalendarRecordNewOrFixWrap = styled.div`
    width:100%;
    height:100%;
    // border:1px solid black;
    padding:20px 15px;
`

const CalendarBack = styled.div`
    height:10%;
    font-size: 25px;
    // border: 1px solid black;
    color: skyblue;
`

const CalendarRecordAddArea = styled.div`
    height:90%;
    // border:1px solid black;
`

const RecordButton = styled.button`
    width: 100px;
    height: 35px;
    border-radius: 5px;
    position: absolute;
    bottom: 20px;
    right: 15px;
`
export default CalendarRecordNewOrFix;