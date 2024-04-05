import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import FriendTitleComponent from "../friend/FriendTitleComponent";
import ProfileComponent from "../../../component/ProfileComponent";
import {CommentDto, CommentParam, CommentSn} from "../../../model/CommentApiModel";
import {deleteComment, getComments, insertComment} from "../../../api/CommentApi";
import CommentDetailComponent from "./CommentDetailComponent";
import userEtt from "../../../services/UserEtt";
import {useQuery, useQueryClient} from "react-query";
import CalendarLayout from "../Layout/CalendarLayout";
import {getFormatDay, getY_m_dDay} from "../../../services/formattingDay";
import {useConfirm} from "../../../hooks/useConfirm";
import {getData} from "../../../api/Api";
import {selectMemo} from "../../../api/Memo";

const CalendarCommentPage = () => {
    const {state} = useLocation();
    const calendarData = state.data;
    const user = userEtt();
    const queryClient = useQueryClient();
    const {confirmFunction} = useConfirm();

    const {data: commentData, isLoading} = useQuery(['getComments', calendarData.calendarSn], () => getData(getComments, calendarData.calendarSn), {});

    const [newCommentValue, setNewCommentValue] = useState("");
    const newCommentFunction = async () => {
        let param: CommentParam = {calendarSn: calendarData.calendarSn, commentContent: newCommentValue};
        const {data: newComment} = await insertComment(param);
        const existingData: CommentDto[] = queryClient.getQueryData(['getComments', calendarData.calendarSn]) || []; // 기존 데이터를 가져옵니다.
        const newData = [newComment, ...existingData]; // 새로운 데이터를 추가합니다.
        queryClient.setQueryData(['getComments', calendarData.calendarSn], newData);// 데이터를 업데이트합니다.

    };


    const removeCommentCallBack = async (commentSn: number) => {
        let param: CommentSn = {commentSn: commentSn};
        const {data} = await deleteComment(param);
        if (data > 0) {
            await queryClient.invalidateQueries(['getComments', calendarData.calendarSn])
        }
    }

    const removeComment = (sn: number) => {
        confirmFunction(() => removeCommentCallBack(sn), '댓글을 삭제합니다<br/>삭제한 댓글을 복구할 수 없습니다')
    }

    return (
        <CalendarLayout gnbTitle={`${getY_m_dDay(calendarData.recordDate)} 일정`} useBottom={false}>
            <React.Fragment>
                <CommentTargetWrap>
                    <div>{calendarData.title}</div>
                    <Content>{calendarData.content}</Content>
                    <div
                        style={{textAlign: "right"}}>{getFormatDay(calendarData.frstRegistDt, 'YYYY.MM.DD HH:mm')}</div>
                </CommentTargetWrap>

                <FriendTitleComponent
                    title={'댓글'} size={commentData?.length}
                    style={{marginLeft: "7px", marginBottom: "7px"}}
                />

                <CommentDetailWrap>
                    {commentData?.map((comment) => (
                            <CommentDetailComponent
                                key={comment.commentSn}
                                data={comment}
                                isMyComment={user.membSn === comment.membSn}
                                trashFuntion={removeComment}
                            />
                    ))}
                </CommentDetailWrap>


                <CommentWriteArea>
                    <ProfileComponent naviUse={false} size={35} isMy={true}/>
                    <Div>
                        <CommentInput
                            value={newCommentValue} type="text" placeholder="댓글을 입력하세요"
                            onChange={(e) => setNewCommentValue(e.target.value)}/>
                        <RegisterBtn onClick={() => confirmFunction(newCommentFunction, `댓글을 작성 하시겠습니까?`)}
                                     type="button">작성</RegisterBtn>
                    </Div>
                </CommentWriteArea>
            </React.Fragment>
        </CalendarLayout>
    );
};

const CommentTargetWrap = styled.div`
  width: 100%;
  height: fit-content;
  background: white;
  padding: 55px 10px 0 10px;
  border-bottom: 1px solid #e8e8e8;
`
const Content = styled.div`
  font-size: 13px;
  white-space: break-spaces;
`
const CommentWriteArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #e8e8e8;
  padding: 10px 12px;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
`
const CommentInput = styled.input`
  font-size: 13px;
  height: 35px;
  white-space: break-spaces;
  border: none;
  outline: none;
  width: 85%;
`
const RegisterBtn = styled.button`
  width: 15%;
  font-size: 13px;
  white-space: break-spaces;
  background: skyblue;
  color: rgb(255, 255, 255);
  font-size: 16px;
  border: 1px solid skyblue;
  padding: 2px 5px;
  min-width: 50px;
  border-radius: 5px;
`
const Div = styled.div`
  width: 90%;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  max-width: 500px;
  padding: 3px 5px;
  height: 40px;
  min-width: 300px;
`
const CommentDetailWrap = styled.div`
  width: 100%;
  height: fit-content;
  background: white;
  padding-bottom: 49px;
`
export default CalendarCommentPage;