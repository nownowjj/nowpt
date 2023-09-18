// import React, {useState} from 'react';
// import Input from "../../component/Input";
// import Button from "../../component/JoinButton";
// import {insertNotice} from "../../api/NoticeApi";
// import {validateNotice} from "../../services/validate";
//
// const NoticeInsertComponent = () => {
//     const [noticeTitle,setNoticeTitle] = useState("");
//     const [noticeContent,setNoticeContent] = useState("");
//
//     const handleTitleChange =(value)=>{
//         setNoticeTitle(value)
//     }
//     const handleContentChange =(value)=>{
//         setNoticeContent(value)
//     }
//
//     const insertNoticeEvent =()=>{
//         let noticeDto = {
//             noticeTitle : noticeTitle,
//             noticeContent : noticeContent
//         }
//
//         if(!(validateNotice(noticeDto))){
//             return false;
//         }
//
//
//
//         insertNotice(noticeDto)
//             .then(response => {
//                 alert(response.msg)
//                 console.log(response)
//                 window.location.replace("/go/notice")
//             })
//             .catch(error =>{
//                 console.log(error)
//         })
//     }
//     return (
//         <div>
//             <h2>공지사항 등록</h2>
//             <Input
//                 type="text"
//                 placeholder={"공지사항 제목"}
//                 name="noticeTitle"
//                 value={noticeTitle}
//                 onChange={handleTitleChange}
//             />
//             <Input
//                 type="text"
//                 placeholder={"공지사항 내용"}
//                 name="noticeContent"
//                 value={noticeContent}
//                 onChange={handleContentChange}
//             />
//             <Button
//                 value="등록"
//                 onClick={insertNoticeEvent}
//             />
//
//         </div>
//     );
// };
//
// export default NoticeInsertComponent;