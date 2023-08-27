import React from 'react';
import styled from "styled-components";
import ggwak from "../../../assets/ggwak-removebg-preview.png";

const CalendarDetailNoWrap = styled.div`
    width:100%;
    height:600px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:white;
    background-image: url(${ggwak});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    position:relative;
`

const CalendarDetailNo = () => {
    return (
        <CalendarDetailNoWrap/>
    );
};

export default CalendarDetailNo;