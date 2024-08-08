import React from 'react';
import {NavLink} from "react-router-dom";
import {MdArticle, MdOutlineCalendarMonth, MdPerson} from "react-icons/md";
import styled from "styled-components";
import {route} from "../../../services/remocon";
import {BiBookmarks} from "react-icons/bi";
import {FaMapMarkedAlt} from "react-icons/fa";

const CalendarBottomMenu = () => {
    const iconStyle = {width:"50%",height:"50%"};


    return (
        <CalendarBottom>
            <StyledLink  className={({ isActive }) => isActive ? 'active' : ''}  to={route.memo} >
                <MdArticle style={iconStyle}/>
                <BottomTitle>메모</BottomTitle>
            </StyledLink>
            {/*<StyledLink className={({ isActive }) => isActive ? 'active' : ''}  to={route.calendarImport} >*/}
            {/*    <BiBookmarks style={iconStyle}/>*/}
            {/*</StyledLink>*/}
            <StyledLink  className={({ isActive }) => isActive ? 'active' : ''}  to={route.calendar}>
                <MdOutlineCalendarMonth style={iconStyle}/>
                <BottomTitle>캘린더</BottomTitle>
            </StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : ''}   to={route.myPage} >
                <MdPerson style={iconStyle}/>
                <BottomTitle>내정보</BottomTitle>
            </StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : ''}  to={route.weather}>
                <FaMapMarkedAlt   style={iconStyle}/>
                <BottomTitle>지도</BottomTitle>
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
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.08);
`
const StyledLink = styled(NavLink)`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-decoration: none;
    //color: #00000052;
    color: rgba(0, 0, 0, 0.52);
    flex-direction: column;
    font-size:12px;
    flex:1;
`;

const BottomTitle = styled.p`
  //color: gray;
`


export default CalendarBottomMenu;
