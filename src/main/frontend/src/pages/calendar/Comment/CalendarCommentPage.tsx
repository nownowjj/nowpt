import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import styled from "styled-components";
import FriendTitleComponent from "../friend/FriendTitleComponent";
import dayjs from "dayjs";
import ProfileComponent from "../../../component/ProfileComponent";
import {CommentDto, CommentParam} from "../../../model/CommentApiModel";
import {getComments, insertComment} from "../../../api/CommentApi";
import ConfirmComponent from "../component/ConfirmComponent";
import CommentDetailComponent from "./CommentDetailComponent";
import userEtt from "../../../services/UserEtt";
import {useQuery, useQueryClient} from "react-query";

const CalendarCommentPage = () => {
    const {state} = useLocation();
    const calendarData = state.data;
    const user = userEtt();
    const queryClient = useQueryClient();

    const { isLoading, data:commentData, isError } = useQuery({
        queryKey: ['getComments', calendarData.calendarSn], // 고유한 쿼리 키
        queryFn: async () => {
            const result = await getComments(calendarData.calendarSn);
            return result.data;
        },
        // refetchOnMount: false, // 마운트 시에만 새로고침
    });



    const [newCommentValue, setNewCommentValue] = useState("");
    const newCommentFunction = async () => {
        try {
            let param: CommentParam = { calendarSn: calendarData.calendarSn, commentContent: newCommentValue };
            const response = await insertComment(param);
            console.log(response);
            const existingData:CommentDto[] = queryClient.getQueryData(['getComments', calendarData.calendarSn]) || []; // 기존 데이터를 가져옵니다.
            const newData = [ response.data , ...existingData]; // 새로운 데이터를 추가합니다.
            queryClient.setQueryData(['getComments', calendarData.calendarSn], newData);// 데이터를 업데이트합니다.
        } catch (error) {
            console.error(error);
        }
    };

    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();

    const confirmFunction = (okCallBack: () => void,  message:string)=>{
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }
    return (
        <>
            <TopGnbComponent page={dayjs(calendarData.recordDate).format('YYYY-MM-DD 일정')}/>

            <CommentTargetWrap>
                <div>{calendarData.title}</div>
                <Content>{calendarData.content}</Content>
                <div style={{textAlign: "right"}}>{dayjs(calendarData.frstRegistDt).format('YYYY.MM.DD HH:mm 작성')}</div>
            </CommentTargetWrap>

            <FriendTitleComponent
                title={'댓글'} size={commentData?.length}
                style={{marginLeft: "7px", marginBottom: "7px"}}
            />

            {/*!!!*/}
            <CommentDetailWrap>
                {isLoading ?'로딩s중'
                    :
                    commentData?.map((comment)=>(
                        <CommentDetailComponent
                            key={comment.commentSn}
                            data={comment}
                            isMyComment={user.membSn === comment.membSn}

                        />
                    ))
                }
            </CommentDetailWrap>
            {/*!!!*/}


            <CommentWriteArea>
                <ProfileComponent naviUse={false} size={35}/>
                <Div>
                    <CommentInput
                        value={newCommentValue} type="text" placeholder="댓글을 입력하세요"
                        onChange={(e) => setNewCommentValue(e.target.value)}/>
                    <RegisterBtn onClick={()=> confirmFunction(newCommentFunction ,`댓글을 작성 하시겠습니까?` )} type="button">작성</RegisterBtn>
                </Div>
            </CommentWriteArea>


            {/* 삭제전 Confirm */}
            {showAlert &&(
                <ConfirmComponent
                    message= {messageCall}
                    okCallBack={() => {
                        okCallBackFn && okCallBackFn(); // 확인 버튼 클릭 시, 콜백 함수를 실행
                        setShowAlert(false);
                    }}
                    onClose={()=> setShowAlert(false)}
                />
            )}
            {/* 삭제전 Confirm */}
        </>
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
    width:100%;
    height:fit-content;
    background:white;
    padding-bottom: 49px;
`
export default CalendarCommentPage;