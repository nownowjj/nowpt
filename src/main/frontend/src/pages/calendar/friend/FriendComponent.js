import React, {useState} from 'react';
import styled from "styled-components";
import loginTrueButNoProfile from "../../../assets/ggwak.png";
import ConfirmComponent from "../component/ConfirmComponent";

const FriendComponent = ({data , leftText ,rightText ,leftCallBack , rightCallBack , paramKey}) => {
    const profileSrc = data.friendProfile ? data.friendProfile :loginTrueButNoProfile;
    console.log(paramKey);

    const leftEvent =()=>{
        leftCallBack(paramKey)
    }

    const rightEvent =()=>{
        rightCallBack(paramKey)
    }

    // Alert 여부
    const [showConfirm , setShowConfirm] = useState(false);
    const [okCallBackFn, setOkCallBackFn] = useState(null);
    const [messageCall, setMessageCall] = useState('');

    const confirmFunction =(okCallBack , message)=>{
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
                    {/*<FriendButton style={{color:"white",background:"skyblue"}}  onClick={()=> confirmFunction(leftEvent ,`${data.friendNm}님의 친구 요청을<br/> 수락 하시겠습니까?` )}>{leftText ? leftText : '수락'}</FriendButton>*/}
                    <FriendButton style={{color:"white",background:"skyblue"}} onClick={()=> leftEvent()}>{leftText ? leftText : '수락'}</FriendButton>
                    <FriendButton style={{color:"black",background:"#e8e8e8"}} onClick={()=> confirmFunction(rightEvent ,`${data.friendNm}님의 친구 요청을<br/> 거절 하시겠습니까?` )}>{rightText ? rightText: '거절' }</FriendButton>
                    {/*<FriendButton style={{color:"black",background:"#e8e8e8"}} onClick={()=> rightEvent()}>{rightText ? rightText: '거절' }</FriendButton>*/}
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
    display:flex;
    justify-content: space-between;
`

const FriendButton = styled.button`
    border:none;
    border-radius:5px;
    font-size:14px;
    font-weight: 400;
    width: 120px;
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
    padding-left:10px;
`

export default FriendComponent;