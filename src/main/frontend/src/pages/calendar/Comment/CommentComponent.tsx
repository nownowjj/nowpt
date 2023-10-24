import React, {useEffect, useState} from 'react';
import {CommentDto} from "../../../model/CommentApiModel";
import {getComments} from "../../../api/CommentApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import styled from "styled-components";
import CommentDetailComponent from "./CommentDetailComponent";
import userEtt from "../../../services/UserEtt";

interface CommentComponentPropsInterface {
    calendarSn : number;
}
const CommentComponent:React.FC<CommentComponentPropsInterface> = ({calendarSn}) => {
    const [comments , setComments] = useState<CommentDto[]>([]);
    const user = userEtt();


    useEffect(() => {
        getComments(calendarSn)
            .then(response=>{
                setComments(response.data);
            }).catch(error =>{
            ApiErrorHandle(error)
        })
    }, []);
    return (
        <CommentDetailWrap>
            {
                comments.length > 0 &&
                comments.map((comment)=>(
                    <CommentDetailComponent
                        key={comment.commentSn}
                        data={comment}
                        user={user.membSn}

                    />
                ))
            }
        </CommentDetailWrap>
    );
};

const CommentDetailWrap = styled.div`
    width:100%;
    height:fit-content;
    background:white;
`
export default CommentComponent;