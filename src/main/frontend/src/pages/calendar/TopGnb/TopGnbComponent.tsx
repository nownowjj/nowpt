import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";

interface TopGnbComponentInterface {
    page:string;
}

const TopGnbComponent = (data:TopGnbComponentInterface) => {
    const navigate = useNavigate();
    return (
        <TopGnbWrap>
            <GnbBackBtn onClick={()=> navigate(-1)}>
                <IoIosArrowBack/>
            </GnbBackBtn>
            <div>{data.page}</div>
        </TopGnbWrap>
    );
};

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