import React, {useEffect, useState} from 'react';
import {LuBell, LuBellRing} from "react-icons/lu";
import styled from "styled-components";
import {BsPeopleFill} from "react-icons/bs";
import {getMyNotification} from "../../../api/NotificationApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import {useNavigate} from "react-router-dom";
import {route} from "../../../services/remocon";

interface AnimatedBellWrapInterface {
    redDots:boolean;
}

const FriendAndNotificationArea = () => {
    const navigate = useNavigate();
    const [isActiveBell , setIsActiveBell] = useState<boolean>(false);

    useEffect(()=>{
        getMyNotification(0,true)
            .then((result)=>{
                if(result.data !== 0 ) setIsActiveBell(true);
            })
            .catch((error)=>{
                ApiErrorHandle(error)
            })
    },[])

    return (
        <AnimatedBellWrap redDots={isActiveBell}>
            <StyledBsPeopleFill onClick={()=> navigate(route.friend)}/>
            {isActiveBell
            ?
                <LuBellRing onClick={()=> navigate(route.notification)} className="vibrating-bell-icon" />
            :
                <LuBell onClick={()=> navigate(route.notification)} />
            }
        </AnimatedBellWrap>
    );
};

const StyledBsPeopleFill = styled(BsPeopleFill)`
    margin-right: 5px;
    padding-bottom: 3px;
    font-size: 30px;
`

const AnimatedBellWrap = styled.div<AnimatedBellWrapInterface>`
    font-size:28px;
    color:#000000;
    height:100%;
    // line-height:50%;
    position:relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    
    &::before{
        content: '';
        display: ${({redDots}) => (redDots ? 'block':'none')};
        position: absolute;
        top: -6px;
        right: -2px;
        width: 5px;
        height: 5px;
        background-color: red;
        border-radius: 50%;
    }
    
`

export default FriendAndNotificationArea;
