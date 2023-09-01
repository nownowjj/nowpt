import React, {useState} from 'react';
import styled from "styled-components";
import FriendComponent from "./FriendComponent";
import FriendTitleComponent from "./FriendTitleComponent";
import AlertComponent from "../component/AlertComponent";
import {friendDto} from "./FriendPage";

interface FriendRequestWaitComponentInterface {
    data : friendDto[];
}

const FriendRequestWaitComponent : React.FC<FriendRequestWaitComponentInterface>= ({data}) => {

    /**
     * friendSn , acceptYn
     * @param key
     */
    // let param={};

        // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [closeCallBackFn , setCloseCallBackFn] = useState<()=>void>();

    const alertFunction =(closeCallBack: ()=> void , message:string)=>{
        setCloseCallBackFn(() => closeCallBack)
        setMessageCall(message);
        setShowAlert(true);
    }

    // const applySuccess=()=>{
    //     console.log("성공!");
    // }

    const closeCallBack:()=>void=()=>{
        setShowAlert(false);
    }

    // 수락 대기중 Alert 띄워준다
    const applyCallBack =()=>{
        alertFunction(closeCallBack,'수락 대기중 입니다.')
    }

    /**
     *
     * @validate 내가 보낸 요청을 취소 해야 한다.
     * 1. friendSn 상태 조회 -> api 요청시에 WAIT 상태인지 확인 해야 함
     * 2. WAIT 상태면 friendSn use_yn(N) -> 요청을 받은 상대는 Notification 전송 되었지만 수락 대기중인 목록에는 조회되지 않는다.
     * 3. WAIT 아니라면 REFUSE 이거나 ACCEPT 상태이다
     * 4. REFUSE 상태라면 상대방이 요청을 거절한 것이므로 그대로 N으로 꺾는다.
     * 5. ACCEPT 상태라면 상대방이 요청을 수락한 상태이므로 Alert을 띄어준 후 [친구 목록 , 요청 대기] 리렌더링 해야 함
     * @param key
     */
    const requestCancelFunction =(key:number)=>{
        console.log(`보낸 요청 취소 ${key}`);
        // updateRequestFriend(param)
        //     .then((response)=>{
        //        console.log(response);
        //     }).catch((error)=>{
        //     alertFunction(null,'에러 발생')
        //     ApiErrorHandle(error)
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
                                    rightCallBack={requestCancelFunction}
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