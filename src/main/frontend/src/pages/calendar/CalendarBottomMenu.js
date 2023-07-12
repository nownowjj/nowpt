import React from 'react';
import {NavLink} from "react-router-dom";
import {MdAddchart, MdArticle, MdErrorOutline, MdOutlineCalendarMonth, MdPerson} from "react-icons/md";
import styled from "styled-components";
import CalendarBottomSpan from "./CalendarBottomSpan";

const CalendarBottomMenu = () => {
    const iconStyle = {width:"50%",height:"50%"};


    return (
        <CalendarBottom>
            <StyledLink  className={({ isActive }) => isActive ? 'active' : undefined}  to={"/"} >
                <MdArticle style={iconStyle}/>
                <CalendarBottomSpan value ="메모"/>
            </StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : undefined}  to={"/"} >
                <MdAddchart style={iconStyle}/>
                <CalendarBottomSpan value ="기록"/>
            </StyledLink>
            <StyledLink  className={({ isActive }) => isActive ? 'active' : undefined}  to={"/calendar"}>
                <MdOutlineCalendarMonth style={iconStyle}/>
                <CalendarBottomSpan value ="캘린더"/>
            </StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : undefined}   to={"/calendarMyPage"} >
                <MdPerson style={iconStyle}/>
                <CalendarBottomSpan value ="내정보"/>
            </StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : undefined}  to={"/"}>
                <MdErrorOutline style={iconStyle}/>
                <CalendarBottomSpan value ="반가워"/>
            </StyledLink>
        </CalendarBottom>
    );
};

const CalendarBottom = styled.div`
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background-color: #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #d1eeff;
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
    // &:hover{
    //     background-color : skyblue;
    // }
`;


export default CalendarBottomMenu;
