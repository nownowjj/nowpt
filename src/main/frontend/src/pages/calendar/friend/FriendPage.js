import React, {useEffect, useState} from 'react';
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import FriendApplyWaitComponent from "./FriendApplyWaitComponent";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {getMyApplyWaitFriend, getMyFriend, getRecommendFriend, getRequestWaitFriend} from "../../../api/friendApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import FriendRecommendComponent from "./FriendRecommendComponent";
import FriendTopNaviComponent from "./FriendTopNaviComponent";
import './friend.css';
import MyFriendComponent from "./MyFriendComponent";
import FriendRequestWaitComponent from "./FriendRequestWaitComponent";
import ggwak from "../../../assets/ggwak-removebg-preview.png";
import CalendarDetailNo from "../component/CalendarDetailNo";

const FriendPage = () => {
    const navigate = useNavigate();
    const [waitList,setWaitList] = useState([]);
    const [requestWaitList,setRequestWaitList] = useState([]);
    const [recommendList,setRecommendList] = useState([]);
    const [myFriendList , setMyFriendList] = useState([]);

    // 내 친구 리스트
    useEffect(()=>{
        getRequestWaitFriend()
            .then(response=>{
                console.log(response);
                setRequestWaitList(response.data)
            })
            .catch(error=>{
                ApiErrorHandle(navigate,error)
            })
    },[])


    // 내 친구 리스트
    useEffect(()=>{
        getMyFriend()
            .then(response=>{
                console.log(response);
                setMyFriendList(response.data)
            })
            .catch(error=>{
                ApiErrorHandle(navigate,error)
            })
    },[])

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

    const [activeIndex , setActiveIndex] = useState(0);
    const activeFn =(index)=>{
        setActiveIndex(index)
    }



    return (
        <Wrap>
            {/* 상단 gnb */}
            <TopGnbComponent page={'친구'}/>
            <FriendTopNaviComponent activeFn={activeFn}/>

            <FriendWrap>
                {
                    activeIndex === 0 
                        ?
                            <MyFriendComponent data={myFriendList}/>
                        :
                    activeIndex === 1
                        ?
                            <>
                                {
                                    waitList.length > 0 || requestWaitList.length > 0
                                    ?
                                        <>
                                            <FriendApplyWaitComponent data={waitList}/>
                                            <FriendRequestWaitComponent data={requestWaitList}/>
                                        </>
                                    :
                                    <CalendarDetailNo/>
                                }
                            </>
                        :
                            <>
                                <FriendRecommendComponent data={recommendList}/>
                            </>
                        
                    
                }


            </FriendWrap>
            {/* 상단 gnb */}
        </Wrap>
    );
};
const Wrap = styled.div`
    width:100%;
    height:fit-content;
    padding-top: 50px;
`

const FriendWrap = styled.div`
    padding:0 10px 0;
    height:fit-content;
`

export default FriendPage;