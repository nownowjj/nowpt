// import React, {useEffect, useState} from 'react';
// import {useLocation} from "react-router-dom";
// import TopGnbComponent from "../TopGnb/TopGnbComponent";
// import styled from "styled-components";
// import FriendTitleComponent from "../friend/FriendTitleComponent";
// import dayjs from "dayjs";
// import ProfileComponent from "../../../component/ProfileComponent";
// import {CommentDto, CommentParam} from "../../../model/CommentApiModel";
// import {getComments, insertComment} from "../../../api/CommentApi";
// import ConfirmComponent from "../component/ConfirmComponent";
// import CommentDetailComponent from "./CommentDetailComponent";
// import userEtt from "../../../services/UserEtt";
// import ApiErrorHandle from "../../../services/ApiErrorHandle";
//
// const CalendarCommentPage = () => {
//     const {state} = useLocation();
//     const data = state.data;
//
//     // Alert 여부
//     const [showAlert , setShowAlert] = useState<boolean>(false);
//     const [messageCall, setMessageCall] = useState<string>('');
//     const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();
//     const confirmFunction = (okCallBack: () => void,  message:string)=>{
//         setOkCallBackFn(() => okCallBack);
//         setMessageCall(message);
//         setShowAlert(true);
//     }
//
//
//     // 해당 calendarSn 댓글 요청 api
//     const [comments , setComments] = useState<CommentDto[]>([]);
//     const user = userEtt();
//     const [commentValue, setValue] = useState("");
//     const [newComment , setNew] = useState<boolean>(false);
//
//     useEffect(() => {
//         getComments(data.calendarSn)
//             .then(response=>{
//                 console.log("댓글 가져오기;");
//                 setComments(response.data);
//             }).catch(error =>{
//             ApiErrorHandle(error)
//         })
//     }, [newComment]);
//
//     const changeCommentHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setValue(e.target.value);
//     }
//     const newCommentFunction =()=>{
//         let param:CommentParam= {calendarSn:data.calendarSn,commentContent:commentValue};
//         insertComment(param)
//             .then(response=>{
//                 setNew(prevState => !prevState);
//                 setValue("");
//             }).catch(error =>{
//                 console.log(error);
//         })
//     }
//
//
//     return (
//         <>
//             <TopGnbComponent page={dayjs(data.recordDate).format('YYYY-MM-DD 일정')}/>
//
//             <CommentTargetWrap>
//                 <div>{data.title}</div>
//                 <Content>{data.content}</Content>
//                 <div style={{textAlign: "right"}}>{dayjs(data.frstRegistDt).format('YYYY.MM.DD HH:mm 작성')}</div>
//             </CommentTargetWrap>
//
//             <FriendTitleComponent title={'댓글'} size={comments.length}
//                                   style={{marginLeft: "7px", marginBottom: "7px"}}/>
//
//             {/*!!!*/}
//             <CommentDetailWrap>
//                 {
//                     comments.length > 0 &&
//                     comments.map((comment)=>(
//                         <CommentDetailComponent
//                             key={comment.commentSn}
//                             data={comment}
//
//
//                         />
//                     ))
//                 }
//             </CommentDetailWrap>
//             {/*!!!*/}
//
//
//             <CommentWriteArea>
//                 <ProfileComponent naviUse={false} size={35}/>
//                 <Div>
//                     <CommentInput
//                         value={commentValue} type="text" placeholder="댓글을 입력하세요"
//                         onChange={changeCommentHandle}/>
//                     <RegisterBtn onClick={()=> confirmFunction(newCommentFunction ,`댓글을 작성 하시겠습니까?` )} type="button">작성</RegisterBtn>
//                 </Div>
//             </CommentWriteArea>
//
//
//             {/* 삭제전 Confirm */}
//             {showAlert &&(
//                 <ConfirmComponent
//                     message= {messageCall}
//                     okCallBack={() => {
//                         okCallBackFn && okCallBackFn(); // 확인 버튼 클릭 시, 콜백 함수를 실행
//                         setShowAlert(false);
//                     }}
//                     onClose={()=> setShowAlert(false)}
//                 />
//             )}
//             {/* 삭제전 Confirm */}
//         </>
//     );
// };
//
// const CommentTargetWrap = styled.div`
//   width: 100%;
//   height: fit-content;
//   background: white;
//   padding: 55px 10px 0 10px;
//   border-bottom: 1px solid #e8e8e8;
// `
// const Content = styled.div`
//   font-size: 13px;
//   white-space: break-spaces;
// `
// const CommentWriteArea = styled.div`
//   width: 100%;
//   height: 50px;
//   display: flex;
//   align-items: center;
//   border-top: 1px solid #e8e8e8;
//   padding: 10px 12px;
//   background: white;
//   position: fixed;
//   bottom: 0;
//   left: 0;
// `
// const CommentInput = styled.input`
//   font-size: 13px;
//   height: 35px;
//   white-space: break-spaces;
//   border: none;
//   outline: none;
//   width: 85%;
// `
// const RegisterBtn = styled.button`
//   width: 15%;
//   font-size: 13px;
//   white-space: break-spaces;
//   background: skyblue;
//   color: rgb(255, 255, 255);
//   font-size: 16px;
//   border: 1px solid skyblue;
//   padding: 2px 5px;
//   min-width: 50px;
//   border-radius: 5px;
// `
// const Div = styled.div`
//   width: 90%;
//   border: 1px solid #e8e8e8;
//   border-radius: 10px;
//   display: flex;
//   align-items: center;
//   margin-left: 10px;
//   max-width: 500px;
//   padding: 3px 5px;
//   height: 40px;
//   min-width: 300px;
// `
// const CommentDetailWrap = styled.div`
//     width:100%;
//     height:fit-content;
//     background:white;
//     padding-bottom: 49px;
// `
// export default CalendarCommentPage;