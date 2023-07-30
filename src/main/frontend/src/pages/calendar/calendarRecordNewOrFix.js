import React, {useState} from 'react';
import CalendarWrap from "./component/CalendarWrapComponent";
import styled from "styled-components";
import {insertRecord} from "../../api/CalendarApi";
import {useLocation, useNavigate} from 'react-router-dom'
import moment from "moment";

const CalendarRecordNewOrFix = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const isFix = !!state.sn;
    const initialTitle = state.sn ? state.title : "";       // Title ,Content가 존재한다면 input value를 지정해놓는다.
    const initialContent = state.sn ? state.content : "";
    const {recordDate} = state;
    const [titleValue , setTitleValue] = useState(initialTitle);
    const [contentValue , setContentValue] = useState(initialContent);


    console.log(recordDate);
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

    const recordInput ={
    };

    const changeTitle=(e)=>setTitleValue(e.target.value);
    const changeContent=(e)=>setContentValue( (e.target.value).replaceAll("<br>", "\r\n") );

    return (
        <CalendarWrap>
            <CalendarRecordNewOrFixWrap>
                {/* back button*/}
                <CalendarBack>
                    <span onClick={()=> navigate(-1) }>◀</span>
                    <span style={{color:"black"}}>{moment(recordDate).format('YYYY-MM-DD')}</span>
                </CalendarBack>


                {/* record Wrap*/}
                <CalendarRecordAddArea>
                    <RecordTitleInput spellcheck="false" type="text" onChange={changeTitle} value={titleValue} placeholder='제목입력'/>
                    <RecordContentInput  spellcheck="false" type="text" style={recordInput} onChange={changeContent} value={contentValue} placeholder='내용입력'/>
                    <RecordButton onClick={newRecordEvent}>{isFix ? '수정' : '등록'}</RecordButton>
                </CalendarRecordAddArea>

            </CalendarRecordNewOrFixWrap>
        </CalendarWrap>
    );
};

const RecordTitleInput = styled.input`
    width:100%;
    border:none;
    outline:none;
    padding: 10px 1px;
    font-size: 18px;
      &:focus {
        border-bottom:2px solid skyblue;
    }
`
const RecordContentInput = styled.textarea`
    width: 100%;
    border: none;
    border-radius: 5px;
    height: 100%;
    outline: none;
    padding: 2px 1px;
    resize: none;
      &:focus {
        border:2px solid skyblue;
    }
`
const CalendarRecordNewOrFixWrap = styled.div`
    width:100%;
    height:100%;
    padding:20px 15px;
    
`
const CalendarBack = styled.div`
    height: 8%;
    font-size: 25px;
    display: flex;
    color: skyblue;
    justify-content: space-between;
`
const CalendarRecordAddArea = styled.div`
    height:92%;
    border: 2px solid skyblue;
    border-radius: 5px;
    display:flex;
    flex-direction:column;
    align-items: center;
    padding: 0 10px 45px;
`
const RecordButton = styled.button`
    width: 100px;
    height: 35px;
    border:1px solid skyblue;
    background:skyblue;
    color:white;
    border-radius: 5px;
    position: absolute;
    bottom: 27px;
    right: 27px;
`
export default CalendarRecordNewOrFix;