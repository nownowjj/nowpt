import React from 'react';
import {NavLink} from "react-router-dom";
import {MdArticle, MdErrorOutline, MdOutlineCalendarMonth, MdPerson} from "react-icons/md";
import styled from "styled-components";
import {route} from "../../../services/remocon";
import {BiSolidBookmarks} from "react-icons/bi";

const CalendarBottomMenu = () => {
    const iconStyle = {width:"50%",height:"50%"};


    return (
        <CalendarBottom>
            <StyledLink  className={({ isActive }) =>isActive && 'active'}  to={"/"} >
                <MdArticle style={iconStyle}/>
                <span>아무개</span>
            </StyledLink>
            <StyledLink className={({ isActive }) => isActive && 'active'}  to={route.calendarImport} >
                {/*<TiStarFullOutline style={iconStyle}/>*/}
                {/*<BiBookmarks style={iconStyle}/>*/}
                <BiSolidBookmarks style={iconStyle}/>
                <span>중요</span>
            </StyledLink>
            <StyledLink  className={({ isActive }) =>isActive && 'active'}  to={route.calendar}>
                <MdOutlineCalendarMonth style={iconStyle}/>
                <span>캘린더</span>
            </StyledLink>
            <StyledLink className={({ isActive }) =>isActive && 'active'}   to={route.myPage} >
                <MdPerson style={iconStyle}/>
                <span>프로필</span>
            </StyledLink>
            <StyledLink className={({ isActive }) =>isActive && 'active'}  to={"/"}>
                <MdErrorOutline style={iconStyle}/>
                <span>공지사항</span>
            </StyledLink>
        </CalendarBottom>
    );
};

const CalendarBottom = styled.div`
    padding-top: 2px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    z-index:10;
    // border-top: 1px solid #e8e8e8;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.5);
`
const StyledLink = styled(NavLink)`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-decoration: none;
    // color:#dbdbdb;
        color: #00000052;
    flex-direction: column;
    font-size:12px;
    flex:1;
    
`;


export default CalendarBottomMenu;
