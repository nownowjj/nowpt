import React, {useState} from 'react';
import styled from "styled-components";
import FriendComponent from "./FriendComponent";
import FriendTitleComponent from "./FriendTitleComponent";
import {useNavigate} from "react-router-dom";
import AlertComponent from "../component/AlertComponent";
import ggwak from "../../../assets/ggwak-removebg-preview.png";

const FriendRequestWaitComponent = ({data}) => {
    const navigate = useNavigate();

    /**
     * friendSn , acceptYn
     * @param key
     */
    let param={};

    // Alert 여부
    const [showAlert , setShowAlert] = useState(false);
    const [messageCall, setMessageCall] = useState('');
    const [closeCallBackFn , setCloseCallBackFn] = useState(null);

    const alertFunction =(closeCallBack,message)=>{
        setCloseCallBackFn(() => closeCallBack)
        setMessageCall(message);
        setShowAlert(true);
    }

    const applySuccess=()=>{
        console.log("성공!");
    }

    // 수락 대기중 Alert 띄워준다
    const applyCallBack =()=>{
        alertFunction(setShowAlert(false),'수락 대기중 입니다.')
    }

    // 내가 보낸 친구 요청을 취소한다 TODO
    const rejectCallBack =(key)=>{
        param.friendSn = key;
        console.log("FriendApplyWaitComponent 친구 거절 ",key);
        updateFunction(param);
    }

    const updateFunction =(param , mode=false)=>{
        // updateRequestFriend(param)
        //     .then((response)=>{
        //        console.log(response);
        //     }).catch((error)=>{
        //     alertFunction(null,'에러 발생')
        //     ApiErrorHandle(navigate,error)
        // })
    }
    return (
        <>
            <FriendWaitWrap>
                <FriendTitleComponent
                    title="보낸 요청"
                    size={data.length}
                    color='blue'
                />
                {
                    data.length > 0
                        ?
                            data.map((applyList) => (
                                <FriendComponent
                                    key={applyList.friendSn}
                                    paramKey = {applyList.friendSn}
                                    data={applyList}
                                    leftText="수락 대기중"
                                    rightText="요청 취소"
                                    leftCallBack={applyCallBack}
                                    rightCallBack={rejectCallBack}
                                />
                            ))
                        :
                          null
                }
            </FriendWaitWrap>


            {/* AlertComponent */}
            {showAlert &&(
                <AlertComponent
                    message= {messageCall}
                    onClose={()=> {
                        closeCallBackFn && closeCallBackFn();
                        setShowAlert(false);
                    }}
                />
            )}
            {/* AlertComponent */}
        </>
    );
};
const FriendWaitWrap = styled.div`
    width:100%;
    // height:80px;
    //border-bottom:1px solid #e8e8e8;
`

export default FriendRequestWaitComponent;