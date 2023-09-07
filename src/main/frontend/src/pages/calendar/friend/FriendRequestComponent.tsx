import React, {useState} from 'react';
import styled from "styled-components";
import FriendComponent from "./FriendComponent";
import FriendTitleComponent from "./FriendTitleComponent";
import AlertComponent from "../component/AlertComponent";
import {friendDto} from "./FriendPage";
import {cancelFriendRequestApi} from "../../../api/friendApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import {useDispatch} from "react-redux";
import {firstEvent, fiveEvent} from "../../../redux/slice/friendSlice";
import {FriendSn} from "../../../model/FriendApiModel";

interface FriendRequestWaitComponentInterface {
    data : friendDto[];
}

const FriendRequestComponent : React.FC<FriendRequestWaitComponentInterface>= ({data}) => {
    const dispatch = useDispatch();

        // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [closeCallBackFn , setCloseCallBackFn] = useState<()=>void>();

    const alertFunction =(closeCallBack: ()=> void , message:string)=>{
        setCloseCallBackFn(() => closeCallBack)
        setMessageCall(message);
        setShowAlert(true);
    }


    const requestCancelFunction =(key:number) =>{
        const param:FriendSn={friendSn:key};
        console.log(`보낸 요청 취소 ${key}`);
        cancelFriendRequestApi(param)
            .then((response)=>{
                console.log(response);
                dispatch(firstEvent())
                alertFunction(()=> setShowAlert(false),'요청 취소 성공')
            }).catch((error)=>{
                alertFunction(()=> setShowAlert(false),'요청 취소 실패')
                ApiErrorHandle(error)
        })
    }
    return (
        <>
            <FriendWaitWrap>
                <FriendTitleComponent
                    title="보낸 요청"
                    size={data.length}
                    color='blue'
                    style={{marginTop:'10px'}}
                />
                {
                    data.length > 0 &&
                            data.map((applyList) => (
                                <FriendComponent
                                    key={applyList.friendSn}
                                    paramKey = {applyList.friendSn}
                                    data={applyList}
                                    leftText="수락 대기중"
                                    rightText="요청 취소"
                                    leftCallBack={()=> alertFunction(()=> setShowAlert(false),'수락 대기중 입니다.')}
                                    rightCallBack={requestCancelFunction}
                                />
                            ))
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
`

export default FriendRequestComponent;