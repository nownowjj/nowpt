import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";

const TopGnbComponent = (data) => {
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
    border-bottom:1px solid #e8e8e8;
    z-index:100;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    background: white;

`

const GnbBackBtn = styled.button`
    background: none;
    border: none;
    font-size: 21px;
`

export default TopGnbComponent;