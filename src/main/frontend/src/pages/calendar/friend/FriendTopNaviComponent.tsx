import React, {useState} from 'react';
import styled from "styled-components";

interface FriendTopNaviComponentProps {
    activeFn: (index: number) => void;
}

const FriendTopNaviComponent: React.FC<FriendTopNaviComponentProps> = ({ activeFn }) => {

    const [index,setIndex] = useState<number>(0);
    const activeMenu =(index:number)=>{
        setIndex(index);
        activeFn(index)
    }

    return (
        <FriendTopNaviWrap className="friendTopNavi">
            <li className={index === 0 ? 'friend-active' : ''} onClick={()=> activeMenu(0)}>내 친구 목록</li>
            <li className={index === 1 ? 'friend-active' : ''} onClick={()=> activeMenu(1)}>보낸/받은 요청</li>
            <li className={index === 2 ? 'friend-active' : ''} onClick={()=> activeMenu(2)}>친구 추천</li>
        </FriendTopNaviWrap>
    );
};

const FriendTopNaviWrap =styled.ul`
    width:100%;
    height:35px;
    // padding:0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    position: relative;
`

export default FriendTopNaviComponent;