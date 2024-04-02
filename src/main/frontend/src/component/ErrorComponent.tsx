import React from 'react';
import styled from "styled-components";
import errorOri from "../assets/error_2.png"
import {useNavigate} from "react-router-dom";
import {route} from "../services/remocon";

const ErrorComponent = () => {
    const navigate = useNavigate();

    return (
        <ErrorWrap>
            <ErrorOri/>
            <ErrorText>알수없는 에러가 발생 하였습니다<br/>잠시 후 다시 이용해 주세요</ErrorText>
            <GoLoginBtn onClick={()=> navigate(route.login)}>로그인 페이지로 이동</GoLoginBtn>
            <GoCalendarBtn onClick={()=> navigate(route.calendar)}>캘린더로 이동</GoCalendarBtn>
        </ErrorWrap>
    );
};

const ErrorText = styled.div`
    text-align: center;
    font-size: 18px;

`

const GoLoginBtn = styled.div`
    width: 300px;
    height: 50px;
    background: skyblue;
    color: white;
    font-size: 16px;
    text-align: center;
    line-height: 50px;
    position: absolute;
    bottom: 50px;
`
const GoCalendarBtn = styled(GoLoginBtn)`
    bottom:110px
`

const ErrorOri = styled.div`
  width:300px;
  height: 300px;
  background: url(${errorOri}) no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 15px;
  border:1px solid #e8e8e8;
  margin: 100px 0 30px;
  
`

const ErrorWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative; /* 추가 */
`

export default ErrorComponent;