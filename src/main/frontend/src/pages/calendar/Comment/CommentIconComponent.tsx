import React from 'react';
import {FaRegComment, FaRegCommentDots} from "react-icons/fa";
import {route} from "../../../services/remocon";
import {useNavigate} from "react-router-dom";
import {CalendarDto} from "../../../model/CalendarApiModel";

interface DetailCommentSubComponentProps{
    data : CalendarDto;
}
const CommentIconComponent:React.FC<DetailCommentSubComponentProps>  =({data})=>{
    const CommentIcon = data.commentCount > 0 ? FaRegCommentDots : FaRegComment;
    const navigate = useNavigate();

    return (
        <>
            {
                <CommentIcon
                    onClick={() =>
                        navigate(route.comment, {
                            state: {
                                "data" : data
                            },
                        })
                    }
                    style={{marginRight : "2px"}}
                />
            }
            <span style={{marginRight : "1px"}}>{data.commentCount}</span>
        </>
    );
};


export default CommentIconComponent;