import React, {useState} from 'react';
import FriendTitleComponent from "./FriendTitleComponent";
import FriendComponent from "./FriendComponent";
import CalendarDetailNo from "../component/CalendarDetailNo";
import {friendDto} from "./FriendPage";
import {RootState} from "../../../redux/store/store";
import {useDispatch, useSelector} from "react-redux";
import {deleteFriendApi} from "../../../api/friendApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import {secondEvent} from "../../../redux/slice/friendSlice";
import AlertComponent from "../component/AlertComponent";

interface MyFriendComponentInterface {
    data:friendDto[];
}

const MyFriendListComponent : React.FC<MyFriendComponentInterface> = ({data}) => {
    const dispatch = useDispatch();
    const membSn = useSelector((state :RootState)=> state.user.user!.membSn);
    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [closeCallBackFn , setCloseCallBackFn] = useState<()=>void>();

    const alertFunction =(closeCallBack: ()=> void , message:string)=>{
        setCloseCallBackFn(() => closeCallBack)
        setMessageCall(message);
        setShowAlert(true);
    }

    const watchMyFriend =(friendMemberSn:number)=>{
        console.log("구경",friendMemberSn);
    }
    const deleteMyFriend=(friendMemberSn:number)=>{
        const deleteParam:{ memberSn: number; friendMemberSn: number } = {friendMemberSn:friendMemberSn,memberSn:membSn};
        deleteFriendApi(deleteParam)
            .then((response)=>{
                dispatch(secondEvent());
                alertFunction(()=> setShowAlert(false),'친구 삭제 성공')
            }).catch((error)=>{
                alertFunction(()=> setShowAlert(false),'친구 삭제 실패')
                ApiErrorHandle(error)
        })

    }
    return (
        <>
            <FriendTitleComponent
                title="내 친구"
                size={data.length}
                color='skyblue'
            />
            {
                data.length > 0 ?
                data.map((list) => (
                    <FriendComponent
                        key={list.friendSn}
                        paramKey = {list.friendMemberSn}
                        data={list}
                        leftText={"구경"}
                        rightText={"친구삭제"}
                        leftCallBack={watchMyFriend}
                        rightCallBack={deleteMyFriend}
                    />
               ))
                    :
                    <CalendarDetailNo/>
            }

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

export default MyFriendListComponent;