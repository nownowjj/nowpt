import React from 'react';
import styled from "styled-components";
import {FiAlertCircle} from "react-icons/fi";

/**
 *
 * @param data : {message,onClose}
 * @returns {AlertComponent}
 */
const AlertComponent = ({ message , onClose }) => {
    return (
        <AlertWrap>
            <AlertBox>
                <AlertTextTop>
                    <StyledIcon/>
                    <AlertMessage dangerouslySetInnerHTML={{ __html: message }}></AlertMessage>
                </AlertTextTop>
                <AlertButtonBottom>
                    <AlertButton  onClick={()=> onClose()}>확인</AlertButton>
                </AlertButtonBottom>
            </AlertBox>
        </AlertWrap>
    );
};
const AlertButton =styled.div`
    display:block;
    padding:5px 30px;
    border:1px solid ;
    color:white;
    border:none;
    font-weight:bold;
    font-size:16px;
    // background : ${({backGround}) => (backGround ? `${backGround}` : `#e8e8e8` )} ;
    background:skyblue;
`

const AlertButtonBottom= styled.div`
    width:100%;
    height:20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
    
`
const AlertMessage= styled.div`
    width: 100%;
    text-align: center;
    height: 60%;
    font-size: 16px;
    font-weight: bold;
    color: #473f3f;
    display: flex;
    align-items: center;
    justify-content: center;
`
const StyledIcon = styled(FiAlertCircle)`
    width:100%;
    height:55%;
    font-size:18px;
    color:skyblue;
    text-align:center;
`

const AlertTextTop = styled.div`
    width:100%;
    height:80%;
    display:flex;
    flex-direction:column;
    align-item:center;
    padding:10px;
`

const AlertBox = styled.div`
    padding: 10px 5px;
    border-radius: 10px;
    border: 2px solid skyblue;
    width: 80%;
    height: 250px;
    position:fixed;
    background:white;
    opacity:1 !important;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    display:flex;
    flex-direction:column;
    
`

const AlertWrap = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid skyblue;
    background-color: rgba( 255, 255, 255, 0.5 );
    position: fixed;
    top:0;
    left:0;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    z-index:999;
`
export default AlertComponent;