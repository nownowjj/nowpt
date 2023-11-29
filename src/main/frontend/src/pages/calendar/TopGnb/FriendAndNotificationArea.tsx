import React, {useEffect, useState} from 'react';
import {LuBell, LuBellRing} from "react-icons/lu";
import styled from "styled-components";
import {BsPeopleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {route} from "../../../services/remocon";
import {getMyNotificationCount} from "../../../api/NotificationApi";
import {useQuery} from "react-query";

interface AnimatedBellWrapInterface {
    redDots:boolean;
}

const FriendAndNotificationArea = () => {
    const navigate = useNavigate();
    const [isActiveBell , setIsActiveBell] = useState<boolean>(false);

    const { data } = useQuery({
        queryKey: ['isNewNotification'],
        queryFn: async () => {
            const result = await getMyNotificationCount();
            return result.data;
        },
        staleTime: 3 * 60 * 1000, // 3분
    });

    useEffect(() => {
        console.log(data);
        if (data && data > 0) {
            setIsActiveBell(true);
        }
    }, [data]);


    return (
        <AnimatedBellWrap onClick={()=> navigate(route.notification)}  redDots={isActiveBell}>
            <StyledBsPeopleFill onClick={()=> navigate(route.friend)}/>
            {isActiveBell ? <LuBellRing className="vibrating-bell-icon" />:<LuBell />}
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
