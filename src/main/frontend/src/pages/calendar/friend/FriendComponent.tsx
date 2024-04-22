import React, {useState} from 'react';
import styled from "styled-components";
import loginTrueButNoProfile from "../../../assets/ggwak.png";
import profileImageError from "../../../assets/error_ori.png";
import ConfirmComponent from "../component/ConfirmComponent";
import {FriendDto} from "../../../model/FriendApiModel";

interface FriendComponentTypeInterface {
    data:FriendDto;
    leftText:string;
    rightText?:string;
    leftCallBack: (key:number , data:FriendDto)=> void;
    rightCallBack:(key:number)=> void;
    paramKey : number;
}

interface rightConfirmMsgMapInterface {
    [index:string] : string;
}

const FriendComponent : React.FC<FriendComponentTypeInterface> = ({data , leftText ,rightText ,leftCallBack , rightCallBack , paramKey}) => {
    const profileSrc = data.friendProfile ? data.friendProfile :loginTrueButNoProfile;

    const leftEvent =()=> leftCallBack(paramKey,data)
    const rightEvent =()=> rightCallBack(paramKey)

    // Alert 여부
    const [showConfirm , setShowConfirm] = useState<boolean>(false);
    const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();
    const [messageCall, setMessageCall] = useState<string>('');

    const rightConfirmMsgMap:rightConfirmMsgMapInterface ={
        ''  : '준비중',
        '친구삭제' : `${data.friendNm}님 친구삭제`,
        '요청 취소'    : `${data.friendNm}님에게 보낸 친구 요청을<br/> 취소 하시겠습니까?`,
        '거절하기'    : `${data.friendNm}님이 보낸 친구 요청을<br/> 거절 하시겠습니까?`
    }

    const confirmCallFunction =()=>{
        if(!rightCallBack) return false;
        console.log(rightText);
        if(rightText)confirmFunction(rightEvent , rightConfirmMsgMap[rightText] )
    }

    const confirmFunction =(okCallBack:()=>void , message:string)=>{
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowConfirm(true);
    }
 
    const onErrorImg = (e:React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = profileImageError
    }

    return (
        <FriendComponentWrap>

            <FriendComponentLeft>
                <FriendImage src={profileSrc} onError={onErrorImg}/>
            </FriendComponentLeft>

            <FriendComponentRight>
                {rightText && <FriendName>{data.friendNm}</FriendName>}
                <FriendButtonWrap>
                    {!rightText && <FriendName>{data.friendNm}</FriendName>}
                    <FriendButton style={{color:"white",background:"skyblue"}} onClick={()=> leftEvent()}>{leftText ? leftText : '수락'}</FriendButton>
                    {rightText && <FriendButton style={{color:"white",background:"#ff8b39",fontWeight:500}} onClick={()=> confirmCallFunction()} >{rightText}</FriendButton>}
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
                    cancelBtnShow={true}
                />
            )}
            {/* 삭제전 Confirm */}

        </FriendComponentWrap>
    );
};
const FriendName = styled.div`
    font-weight:bold;
    padding-bottom: 5px;
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
    white-space: nowrap;
`
const FriendComponentWrap =styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    padding:5px 0;
    border-bottom: 1px solid #e8e8e8;

`
const FriendImage = styled.img`
    border-radius:50%;
    width:70px;
    height:70px;
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
    
    // border: 1px solid #e8e8e8;
    // margin-left: 5px;
    // border-radius: 30px 30px 30px 30px;
`

export default FriendComponent;