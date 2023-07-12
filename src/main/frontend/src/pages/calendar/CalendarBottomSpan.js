import React from 'react';
import styled from "styled-components";

const CalendarBottomSpan = (data) => {
    return (
        <CalendarBottomSpanWrap>
            {data.value}
        </CalendarBottomSpanWrap>
    );
};

const CalendarBottomSpanWrap = styled.span`
    position:absolute;
    bottom:0px;
    font-size: 14px;
    display:none;
`

export default CalendarBottomSpan;