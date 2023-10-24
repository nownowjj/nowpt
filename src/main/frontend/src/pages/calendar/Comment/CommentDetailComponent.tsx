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
    // console.log(data.membSn == user);
    return (
        <CommentWrap>
            <CommentProfile>
                {data.profileImage && <ProfileComponent naviUse={false} size={40} friendImageSrc={data.profileImage} style={{margin:"0 5px"}}/> }
            </CommentProfile>

            <CommentInnerWrap>
                <CommentWriter>{data.membNm}</CommentWriter>
                <CommentDt>{dayjs(data.frstRegistDt).format('YYYY.MM.DD HH:mm')}</CommentDt>
                <CommentContent value={data.commentContent}/>
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
const CommentContent = styled.input`
    width:90%;
    border: none;
`


export default CommentDetailComponent;