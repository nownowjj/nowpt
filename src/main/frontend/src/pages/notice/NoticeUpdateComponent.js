import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {selectNoticeByNoticeSn, updateNotice} from "../../api/NoticeApi";
import Input from "../../component/Input";
import Button from "../../component/JoinButton";

const NoticeUpdateComponent = () => {

    // 공지사항Sn 상세 페이지
    const {noticeSn} = useParams();
    // 상세 정보
    // const  [notice,setNotice] = useState("");

    const [newTitle,setNewTitle] = useState("");
    const [newContent,setNewContent] = useState("");

    const handleTitle = (value)=>{
        console.log(value)
        setNewTitle(value)
    }
    const handleContent = (value)=>{
        console.log(value)
        setNewContent(value)
    }

    const changeNoticeEvent = ()=>{
        let noticeDto = {
            noticeTitle : newTitle,
            noticeContent : newContent
        }
        updateNotice(noticeSn,noticeDto)
            .then(response => {
                alert(response.msg)
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }


    useEffect(()=>{
        selectNoticeByNoticeSn(noticeSn)
            .then(response =>{
                setNewTitle(response.data.noticeTitle)
                setNewContent(response.data.noticeContent)
            }).catch(error =>{
                console.log(error)
        })
    },[])

    return (
        <div>
            <Input
                type="text"
                placeholder={"제목을 입력하세요"}
                name="newTitle"
                value={newTitle}
                onChange={handleTitle}
            />
            <Input
                type="text"
                placeholder={"내용을 입력하세요"}
                name="newContent"
                value={newContent}
                onChange={handleContent}
            />
            <Button
                value="수정"
                onClick={changeNoticeEvent}
            />
        </div>
    );
};

export default NoticeUpdateComponent;