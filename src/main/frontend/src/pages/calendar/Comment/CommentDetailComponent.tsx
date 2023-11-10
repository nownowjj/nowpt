import React from 'react';
import {CommentDto} from "../../../model/CommentApiModel";
import styled from "styled-components";
import ProfileComponent from "../../../component/ProfileComponent";
import dayjs from "dayjs";

interface CommentDetailComponentProps {
    data: CommentDto;
    user:number;
}
const CommentDetailComponent:React.FC<CommentDetailComponentProps> = ({data,user}) => {
    let myComment = data.membSn === user;

    return (
        <CommentWrap>
            <CommentProfile>
                 <ProfileComponent naviUse={false} size={40} friendImageSrc={data.profileImage} style={{margin:"0 5px"}}/>
            </CommentProfile>

            <CommentInnerWrap>
                <CommentWriter>{data.membNm}</CommentWriter>
                <CommentDt>{dayjs(data.frstRegistDt).format('YYYY.MM.DD HH:mm')}</CommentDt>
                <CommentContent> {myComment ? '내꺼' :'아니용'} {data.commentContent}</CommentContent>
            </CommentInnerWrap>
        </CommentWrap>
    );
};

const CommentWrap = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  padding-top: 5px;
`

const CommentProfile = styled.div`
    display: flex;
    align-items: flex-start;
`

const CommentInnerWrap = styled.div`
`
const CommentWriter = styled.span`
    font-weight: 450;
    color:#4f4f4f;
    margin-right: 7px;
`
const CommentDt = styled.span`
    font-size: 14px;
    color:#4f4f4f;
`
const CommentContent = styled.div`
    width: 90%;
    border: none;
    margin: 5px 0;
    background: none;
    resize: none;
    height: auto; /* 초기 높이를 자동으로 조절하도록 설정 */
    overflow: hidden; /* 내용이 넘치면 스크롤바를 표시하지 않도록 설정 */
    word-break: break-all;
    word-wrap: break-word;
`


export default CommentDetailComponent;