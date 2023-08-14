import React, {useEffect, useState} from 'react';
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import FriendApplyWaitComponent from "./FriendApplyWaitComponent";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {getMyApplyWaitFriend, getRecommendFriend} from "../../../api/friendApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import FriendTitleComponent from "./FriendTitleComponent";
import FriendRecommendComponent from "./FriendRecommendComponent";

const FriendPage = () => {
    const navigate = useNavigate();
    const [waitList,setWaitList] = useState([]);
    const [recommendList,setRecommendList] = useState([]);

    // 나에게 친구 요청을 보낸 리스트
    useEffect(()=>{
        getMyApplyWaitFriend()
            .then((response)=>{
                setWaitList(response.data);
            }).catch((error)=>{
            ApiErrorHandle(navigate,error)
        })
    },[])

    // 추천 친구 리스트
    useEffect(()=>{
        getRecommendFriend()
            .then((response)=>{
                setRecommendList(response.data);
            }).catch((error)=>{
            ApiErrorHandle(navigate,error)
        })
    },[])

    return (
        <>
            {/* 상단 gnb */}
            <TopGnbComponent page={'친구'}/>

            <FriendWrap>
                    <FriendApplyWaitComponent division={"wait"} data={waitList}/>

                    <FriendRecommendComponent division={"recommend"}  data={recommendList}/>
            </FriendWrap>
            {/* 상단 gnb */}
        </>
    );
};
const FriendWrap = styled.div`
    padding:50px 10px 0px;
    height:fit-content;
`

export default FriendPage;