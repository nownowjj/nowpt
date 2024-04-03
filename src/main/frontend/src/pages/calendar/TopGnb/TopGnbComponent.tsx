import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";
import ProfileComponent from "../../../component/ProfileComponent";

interface TopGnbComponentInterface {
    page:string;
    friendProfile?:string;
    subTitle?: JSX.Element;
}

const TopGnbComponent = (data:TopGnbComponentInterface) => {
    const navigate = useNavigate();
    return (
        <TopGnbWrap>
            <GnbBackBtn onClick={()=> navigate(-1)}>
                <IoIosArrowBack/>
            </GnbBackBtn>
            <GnbTitle>
                {data.subTitle ?? data.subTitle}
                <span>{data.page}</span>
                {data.friendProfile && <ProfileComponent naviUse={false} size={40} friendImageSrc={data.friendProfile} style={{marginLeft:"5px"}}/> }
            </GnbTitle>
        </TopGnbWrap>
    );
};
const GnbTitle =styled.div`
    display:flex;
    align-items:center;
    height:100%;
`

const TopGnbWrap = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:50px;
    z-index:100;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    background: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`

const GnbBackBtn = styled.button`
    background: none;
    border: none;
    font-size: 21px;
`

export default TopGnbComponent;