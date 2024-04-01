import React from 'react';
import styled from "styled-components";
import {BiTrash} from "react-icons/bi";
import {IoCheckmarkOutline} from "react-icons/io5";

const MemoAddComponent = () => {
    return (
        <MemoAddComponentWrap>
            <MemoTop>
                <MemoTitle type="text" maxLength={100} placeholder='제목입력'/>
                <ScheduleButton> <BiTrash/> </ScheduleButton>
                <ScheduleButton style={{marginLeft : "3px"}}> <IoCheckmarkOutline/> </ScheduleButton>
            </MemoTop>
            <MemoContent maxLength={2000} placeholder='내용입력'/>


        </MemoAddComponentWrap>
    );
};

const MemoTop = styled.div`
  display: flex;
  justify-content: space-between;
`

const ScheduleButton= styled.button`
  border: none;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
`

const MemoAddComponentWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 600px;
`

const MemoContent = styled.textarea`
    width: 100%;
    border: none;
    border-radius: 5px;
    height: 400px;
    outline: none;
    resize: none;
    padding-top: 10px;
`

const MemoTitle = styled.input`
    width: 70%;
    border:none;
    outline:none;
    font-size: 18px;
`


export default MemoAddComponent;