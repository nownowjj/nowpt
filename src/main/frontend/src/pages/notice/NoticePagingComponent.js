import React, {useEffect, useState} from "react";
import {getNotice} from "../../api/NoticeApi";

const NoticePagingComponent = () => {

    const [noticeList,setNoticeList] = useState([]);


    useEffect(()=>{
        getNotice()
            .then(response => {
                // console.log(response.data.content);
                setNoticeList(response.data.content)
            }).catch(error =>{
            console.log(error)
        });
    },[])

    return (
        <div>
            <h2>공지사항 리스트</h2>
            <table border={"1px solid black"}>
                <thead>
                    <th>제목</th>
                    <th>내용</th>
                    <th>등록자</th>
                    <th>수정자</th>
                    <th>등록 시간</th>
                    <th>수정 시간</th>
                </thead>
                <tbody>

                    {noticeList && noticeList.map((list) => {
                        return (
                        <tr key={list.noticeSn}>

                            <td>{list.noticeTitle}</td>
                            <td>{list.noticeContent}</td>
                            <td>{list.frstRegistMembSn}</td>
                            <td>{list.lastChangeMembSn}</td>
                            <td>{list.frstRegistDt}</td>
                            <td>{list.lastChangeDt}</td>

                        </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default NoticePagingComponent ;