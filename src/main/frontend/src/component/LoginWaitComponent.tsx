import React from 'react';
import styled, {keyframes} from "styled-components";
import LoadingDotComponent from "./LoadingDotComponent";

const LoginWaitComponent = () => {
    return (
        <LoginWaitWrap>
            <LoadingDotWrap>
                <LoadingDotComponent delay={true} size={17} loop={5}/>
            </LoadingDotWrap>
        </LoginWaitWrap>
    );
};
const LoginWaitWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LoadingDotWrap = styled.div`
    border: 2px solid #b9f2ff;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`


export default LoginWaitComponent;