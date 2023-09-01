import React from 'react';
import FriendTitleComponent from "./FriendTitleComponent";
import FriendComponent from "./FriendComponent";
import CalendarDetailNo from "../component/CalendarDetailNo";
import {friendDto} from "./FriendPage";

interface MyFriendComponentInterface {
    data:friendDto[];
}

const MyFriendComponent : React.FC<MyFriendComponentInterface> = ({data}) => {
    const watchMyFriend =(friendMemberSn:number)=>{
        console.log("구경",friendMemberSn);
    }

    const removeMyFriend=(friendMemberSn:number)=>{
       console.log("삭제", friendMemberSn);
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
                        rightCallBack={removeMyFriend}
                    />
               ))
                    :
                    <CalendarDetailNo/>
            }
        </>
    );
};

export default MyFriendComponent;