import React from 'react';
import {useLocation} from "react-router-dom";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import CommentComponent from "./CommentComponent";
import styled from "styled-components";
import FriendTitleComponent from "../friend/FriendTitleComponent";
import dayjs from "dayjs";

const CalendarCommentPage = () => {
    const {state} = useLocation();
    const data = state.data;

    return (
        <>
            <TopGnbComponent page={dayjs(data.recordDate).format('YYYY-MM-DD 일정')}/>
            <CommentTargetWrap>
                <div>{data.title}</div>
                <Content>{data.content}</Content>
                <div style={{textAlign:"right"}}>{dayjs(data.frstRegistDt).format('YYYY.MM.DD HH:mm 작성')}</div>
            </CommentTargetWrap>
            <FriendTitleComponent title={'댓글'} size={data.commentCount} style={{marginLeft:"7px",marginBottom:"7px"}}/>
            <CommentComponent
                calendarSn = {data.calendarSn}
            />
        </>
    );
};

const CommentTargetWrap = styled.div`
  width:100%;
  height:fit-content;
  background:white;
  padding:55px 10px 0 10px;
  border-bottom: 1px solid #e8e8e8;
`

const Content = styled.div`
    font-size: 13px;
    white-space: break-spaces;
`
export default CalendarCommentPage;