import React, {useState} from 'react';
import styled from "styled-components";
import FriendComponent from "./FriendComponent";
import FriendTitleComponent from "./FriendTitleComponent";
import {updateRequestFriend} from "../../../api/friendApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import AlertComponent from "../component/AlertComponent";

const FriendApplyWaitComponent = ({data}) => {
console.log(data.length);

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

    const applyCallBack =(key)=>{
        param.friendSn = key;
        param.acceptYn = true;
        console.log("FriendApplyWaitComponent 친구 수락 ",key);
        updateFunction(param,true);
    }

    const rejectCallBack =(key)=>{
        param.friendSn = key;
        param.acceptYn = false;
        console.log("FriendApplyWaitComponent 친구 거절 ",key);
        updateFunction(param);
    }

    const updateFunction =(param , mode=false)=>{
        // const recordIndex = waitList.findIndex((data) => data.friendSn === param.friendSn); // 삭제 요청이 들어온 객체의 index를 찾음
        // console.log(recordIndex);
        updateRequestFriend(param)
            .then((response)=>{
                if(mode)alertFunction(applySuccess,response.data);
                // if (recordIndex !== -1) { // 삭제 요청이 성공 되었고 해당 요소의 index를 찾음
                //     const updatedData = [...waitList]; // 새롭게
                //     console.log(updatedData);
                //     updatedData.splice(recordIndex, 1); //새로 복사한 객체에서 삭제한 index를 제거함
                //     setWaitList(updatedData);
                //     console.log(waitList);
                //     console.log(updatedData);
                // }
            }).catch((error)=>{
            alertFunction(null,'에러 발생')
            ApiErrorHandle(error)
        })
    }
    return (
        <>
            <FriendWaitWrap>
                <FriendTitleComponent
                    title="받은 요청"
                    size={data.length}
                    color='red'
                />
                {
                    data.length > 0
                        ?
                            data.map((applyList) => (
                                <FriendComponent
                                    key={applyList.friendSn}
                                    paramKey = {applyList.friendSn}
                                    data={applyList}
                                    leftText="요청 수락"
                                    rightText="거절하기"
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
    border-bottom:1px solid #e8e8e8;
`

export default FriendApplyWaitComponent;