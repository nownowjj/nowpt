import React, {useState} from 'react';
import styled from "styled-components";
import loginTrueButNoProfile from "../../../assets/ggwak.png";
import ConfirmComponent from "../component/ConfirmComponent";
import {FriendDto} from "../../../model/FriendApiModel";

interface FriendComponentTypeInterface {
    data:FriendDto;
    leftText:string;
    rightText:string;
    leftCallBack: (key:number)=> void;
    rightCallBack:(key:number)=> void;
    paramKey : number;
}

interface rightConfirmMsgMapInterface {
    [index:string] : string;
}

const FriendComponent : React.FC<FriendComponentTypeInterface> = ({data , leftText ,rightText ,leftCallBack , rightCallBack , paramKey}) => {
    const profileSrc = data.friendProfile ? data.friendProfile :loginTrueButNoProfile;

    const leftEvent =()=> leftCallBack(paramKey)
    const rightEvent =()=> rightCallBack(paramKey)

    // Alert 여부
    const [showConfirm , setShowConfirm] = useState<boolean>(false);
    const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();
    const [messageCall, setMessageCall] = useState<string>('');

    const rightConfirmMsgMap:rightConfirmMsgMapInterface ={
        '친구삭제' : `${data.friendNm}님 친구삭제`,
        '요청 취소'    : `${data.friendNm}님에게 보낸 친구 요청을<br/> 취소 하시겠습니까?`,
        '거절하기'    : `${data.friendNm}님이 보낸 친구 요청을<br/> 거절 하시겠습니까?`
    }

    const confirmCallFunction =()=>{
        if(!rightCallBack) return false;
        confirmFunction(rightEvent , rightConfirmMsgMap[rightText] )
    }

    const confirmFunction =(okCallBack:()=>void , message:string)=>{
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowConfirm(true);
    }



    return (
        <FriendComponentWrap>

            <FriendComponentLeft>
                <FriendImage src={profileSrc} />
            </FriendComponentLeft>

            <FriendComponentRight>
                <FriendName>{data.friendNm}</FriendName>
                <FriendButtonWrap>
                    <FriendButton style={{color:"white",background:"skyblue"}} onClick={()=> leftEvent()}>{leftText ? leftText : '수락'}</FriendButton>
                    <FriendButton style={{color:"white",background:"#ff8b39",fontWeight:500}} onClick={()=> confirmCallFunction()} >{rightText}</FriendButton>
                </FriendButtonWrap>
            </FriendComponentRight>


            {/* 삭제전 Confirm */}
            {showConfirm &&(
                <ConfirmComponent
                    message= {messageCall}
                    okCallBack={() => {
                        okCallBackFn && okCallBackFn(); // 확인 버튼 클릭 시, 콜백 함수를 실행
                        setShowConfirm(false);
                    }}
                    onClose={()=> setShowConfirm(false)}
                />
            )}
            {/* 삭제전 Confirm */}

        </FriendComponentWrap>
    );
};
const FriendName = styled.div`
    font-weight:bold;
    padding-bottom: 10px;
`
const FriendButtonWrap = styled.div`
    gap:10px;
    display:flex;
    justify-content: space-between;
`

const FriendButton = styled.button`
    border:none;
    border-radius:5px;
    font-size:14px;
    font-weight: 400;
    width: 50%;
    height: 30px;
`
const FriendComponentWrap =styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    padding:5px 0;

`
const FriendImage = styled.img`
    border-radius:50%;
    width:80px;
    height:80px;
    object-fit: cover;
`
const FriendComponentLeft = styled.div`
    height:100%;
`
const FriendComponentRight = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content: center;
    padding:15px;
`

export default FriendComponent;