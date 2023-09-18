import React, {useEffect, useState} from 'react';
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import ReceivedFriendComponent from "./ReceivedFriendComponent";
import styled from "styled-components";
// import {useNavigate} from "react-router-dom";
import {getMyApplyWaitFriend, getMyFriend, getRecommendFriend, getRequestWaitFriend} from "../../../api/friendApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import FriendRecommendComponent from "./FriendRecommendComponent";
import FriendTopNaviComponent from "./FriendTopNaviComponent";
import '../../../styles/calendarCss/friend.css';
import MyFriendListComponent from "./MyFriendListComponent";
import FriendRequestComponent from "./FriendRequestComponent";
import {RootState} from "../../../redux/store/store";
import {useSelector} from "react-redux";

export interface friendDto {
    friendSn:number;
    friendNm:string;
    friendMemberSn:number;
    frstRegistDt:Date;
    memberSn:number;
    friendProfile:string;
    requestStatus:string;
    acceptYn:boolean;
}

const FriendPage = () => {
    // const navigate = useNavigate();
    const [waitList,setWaitList] = useState<friendDto[]>([]);
    const [recommendList,setRecommendList] = useState<friendDto[]>([]);
    const [myFriendList , setMyFriendList] = useState<friendDto[]>([]);
    const [requestWaitList,setRequestWaitList] = useState<friendDto[]>([]);

    const firstCount = useSelector((state:RootState) => state.friend.firstCount);
    const secondCount = useSelector((state:RootState) => state.friend.secondCount);
    const thirdCount = useSelector((state:RootState) => state.friend.thirdCount);
    const fourthCount = useSelector((state:RootState) => state.friend.fourthCount);
    const fiveCount = useSelector((state:RootState) => state.friend.fiveCount);
    const sixCount = useSelector((state:RootState) => state.friend.sixCount);


    // 내가 보낸 요청중인 리스트
    useEffect(()=>{
        getRequestWaitFriend()
            .then(response=>{
                setRequestWaitList(response.data)
            })
            .catch(error=>{
                ApiErrorHandle(error)
            })
    },[firstCount,sixCount])


    // 내 친구 리스트
    useEffect(()=>{
        getMyFriend()
            .then(response=>{
                setMyFriendList(response.data)
            })
            .catch(error=>{
                ApiErrorHandle(error)
            })
    },[secondCount,thirdCount ,fiveCount,sixCount])

    // 나에게 친구 요청을 보낸 리스트
    useEffect(()=>{
        getMyApplyWaitFriend()
            .then((response)=>{
                setWaitList(response.data);
            }).catch((error)=>{
            ApiErrorHandle(error)
        })
    },[thirdCount,fourthCount ,fiveCount])

    // 추천 친구 리스트
    useEffect(()=>{
        getRecommendFriend()
            .then((response)=>{
                setRecommendList(response.data);
            }).catch((error)=>{
            ApiErrorHandle(error)
        })
    },[firstCount,secondCount,thirdCount,fourthCount ,fiveCount])

    const [activeIndex , setActiveIndex] = useState<number>(0);
    const activeFn =(index:number) => {
        setActiveIndex(index);
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
                            <MyFriendListComponent data={myFriendList}/>
                        :
                    activeIndex === 1
                        ?
                            <>
                                {
                                    // waitList.length > 0 || requestWaitList.length > 0
                                    // ?
                                        <>
                                            {/*{waitList.length > 0 && <ReceivedFriendComponent data={waitList}/>}*/}
                                            {/*{requestWaitList.length > 0 &&<FriendRequestComponent data={requestWaitList}/>}*/}
                                            <ReceivedFriendComponent data={waitList}/>
                                            <FriendRequestComponent data={requestWaitList}/>
                                        </>
                                    // :
                                    // <CalendarDetailNo/>
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