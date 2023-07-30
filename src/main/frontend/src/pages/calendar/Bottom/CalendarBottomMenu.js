import React from 'react';
import {NavLink} from "react-router-dom";
import {MdArticle, MdErrorOutline, MdOutlineCalendarMonth, MdPerson} from "react-icons/md";
import styled from "styled-components";
import {route} from "../../../services/remocon";
import {TiStarFullOutline} from "react-icons/ti";

const CalendarBottomMenu = () => {
    const iconStyle = {width:"50%",height:"50%"};


    return (
        <CalendarBottom>
            <StyledLink  className={({ isActive }) => isActive ? 'active' : undefined}  to={"/"} >
                <MdArticle style={iconStyle}/>
            </StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : undefined}  to={route.calendarImport} >
                <TiStarFullOutline style={iconStyle}/>
            </StyledLink>
            <StyledLink  className={({ isActive }) => isActive ? 'active' : undefined}  to={route.calendar}>
                <MdOutlineCalendarMonth style={iconStyle}/>
            </StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : undefined}   to={route.myPage} >
                <MdPerson style={iconStyle}/>
            </StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : undefined}  to={"/"}>
                <MdErrorOutline style={iconStyle}/>
            </StyledLink>
        </CalendarBottom>
    );
};

const CalendarBottom = styled.div`
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background-color: #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #d1eeff;
    z-index:10;
`
const StyledLink = styled(NavLink)`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-decoration: none;
    color: black;
    flex-direction: column;
`;


export default CalendarBottomMenu;
