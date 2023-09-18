import React, {useState} from 'react';
import styled from "styled-components";
import FriendComponent from "./FriendComponent";
import FriendTitleComponent from "./FriendTitleComponent";
import {updateRequestFriend} from "../../../api/friendApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import AlertComponent from "../component/AlertComponent";
import {FriendDto, FriendUpdateParam} from "../../../model/FriendApiModel";
import {fourthEvent, thirdEvent} from "../../../redux/slice/friendSlice";
import {useDispatch} from "react-redux";
import {requestType} from "./FriendRecommendComponent";

interface FriendApplyWaitComponentProps  {
    data: FriendDto[];
}

const ReceivedFriendComponent: React.FC<FriendApplyWaitComponentProps> = ({ data }) => {
    console.log(data);
    const dispatch = useDispatch();
    /**
     * friendSn , acceptYn
     * @param key
     */
    // let param={};

    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [closeCallBackFn , setCloseCallBackFn] = useState<() => void>();

    const alertFunction =(closeCallBack: ()=> void , message:string)=>{
        setCloseCallBackFn(() => closeCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }


    const applyCallBack =(key:number)=>{
        const param:FriendUpdateParam = {friendSn : key ,acceptYn : true};
        updateFunction(param,true);
    }

    const rejectCallBack =(key:number)=>{
        const param:FriendUpdateParam = {friendSn : key ,acceptYn : false};
        updateFunction(param);
    }

    const requestResponseMap:requestType ={
        'REQUEST_CANCELED' :()=> dispatch(fourthEvent()),
        'REQUEST_ACCEPT'   :()=> dispatch(thirdEvent()),
        'REQUEST_REFUSE'   :()=> dispatch(fourthEvent()),
        'ALREADY_ACCEPT'   :()=> dispatch(thirdEvent())
    }

    const updateFunction =(param:FriendUpdateParam , accept=false)=>{
        updateRequestFriend(param)
            .then((response)=>{
                console.log(response);
                requestResponseMap[response.data]();
                alertFunction(()=> setShowAlert(false),response.message);
            }).catch((error)=>{
                console.log(error);
                alertFunction(()=> setShowAlert(false),'에러 발생');
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
                    data.length > 0 &&
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

export default ReceivedFriendComponent;