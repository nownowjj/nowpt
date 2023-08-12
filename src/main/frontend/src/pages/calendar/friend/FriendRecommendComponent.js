import React from 'react';
import FriendTitleComponent from "./FriendTitleComponent";
import FriendComponent from "./FriendComponent";
import {requestFriend} from "../../../api/friendApi";

const FriendRecommendComponent = ({data}) => {
    console.log(data);
    let param={};
    const addCallBack=(key)=>{
        param.friendMemberSn = key;
        console.log(param);
        console.log("FriendApplyWaitComponent 친구 수락 ",key);
        requestFriend(param)
            .then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
        })
    }

    return (
        <>
            <FriendTitleComponent
                title="친구 추천"
            />
            {data.map((recommendList) => (
                <FriendComponent
                    key={recommendList.friendMemberSn}
                    data={recommendList}
                    paramKey={recommendList.friendMemberSn}
                    leftText='친구 추가'
                    rightText='삭제'
                    leftCallBack={addCallBack}
                    // rightCallBack={removeCallBack}
                />
            ))}
        </>
    );
};

export default FriendRecommendComponent;