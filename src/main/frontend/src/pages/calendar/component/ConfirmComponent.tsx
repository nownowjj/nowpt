import React from 'react';
import styled from "styled-components";
import {FiAlertCircle} from "react-icons/fi";

/**
 *
 * @param data : {okCallBack,message,onClose}
 * @returns {ConfirmComponent}
 * @Memo 확인 callback -> callback 실행 , 취소 -> setShowConfirm(false)
 */

interface ConfirmComponentProps{
    message:string;
    okCallBack:()=> void;
    onClose:()=>void;
}

interface ConfirmButtonProps {
    backGround?: string|null; // Define the prop type here
}

const ConfirmComponent:React.FC<ConfirmComponentProps> = ({ message, okCallBack, onClose }) => {
    return (
        <ConfirmWrap>
            <ConfirmBox>
                <ConfirmTextTop>
                    <StyledIcon/>
                    <ConfirmMessage dangerouslySetInnerHTML={{ __html: message }}></ConfirmMessage>
                </ConfirmTextTop>
                <ConfirmButtonBottom>
                    <ConfirmButton  onClick={()=> onClose()}>취소</ConfirmButton>
                    <ConfirmButton backGround="#ff8b39" onClick={()=> okCallBack()}>확인</ConfirmButton>
                </ConfirmButtonBottom>
            </ConfirmBox>
        </ConfirmWrap>
    );
};
const ConfirmButton =styled.div<ConfirmButtonProps>`
    display:block;
    padding:5px 30px;
    border:1px solid ;
    color:white;
    border:none;
    font-weight:bold;
    font-size:16px;
    background : ${({backGround}) => (backGround ? `${backGround}` : `#e8e8e8` )} ;
`

const ConfirmButtonBottom= styled.div`
    width:100%;
    height:20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
    
`
const ConfirmMessage= styled.div`
    width: 100%;
    text-align: center;
    height: 60%;
    font-size: 20px;
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
    color:#ff8b39;
    text-align:center;
`

const ConfirmTextTop = styled.div`
    width:100%;
    height:80%;
    display:flex;
    flex-direction:column;
    align-item:center;
    padding:10px;
`

const ConfirmBox = styled.div`
    padding: 10px 5px;
    border-radius: 10px;
    border: 2px solid #ff8b39;
    width: 80%;
    height: 250px;
    position:fixed;
    background:white;
    opacity:1 !important;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    display:flex;
    flex-direction:column;
    
`

const ConfirmWrap = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid gray;
    background-color: rgba( 255, 255, 255, 0.5 );
    position: fixed;
    top:0;
    left:0;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    z-index:999;
`
export default ConfirmComponent;