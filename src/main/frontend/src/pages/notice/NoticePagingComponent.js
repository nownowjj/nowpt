import React, {useEffect, useState} from "react";
import {getNotice} from "../../api/NoticeApi";
import Button from "../../component/JoinButton";
import {useNavigate} from "react-router";
import dayjs from "dayjs";

const NoticePagingComponent = () => {
    const navigate = useNavigate();
    const [noticeList,setNoticeList] = useState([]);

    // 현재 페이지 넘버
    const [ pageNumber , setPageNumber ] = useState(0);

    // 페이지 사이즈 입력받거나 default 해놔도 됨
    const [ pageSize  ] = useState(10);


    useEffect(()=>{
        getNotice(pageNumber,pageSize)
            .then(response => {
                // console.log(response.data.content);
                setNoticeList(response.data.content)
            }).catch(error =>{
            console.log(error)
        });
    },[])

    const noticeUpdate = noticeSn =>{
        console.log("클릭 이벤트" + noticeSn);
        navigate("/go/notice/"+noticeSn);
    }


    return (
        <div>
            <h2>공지사항 리스트</h2>
            <table>
                <thead>
                    <tr>
                        <th>공지사항 Sn</th>
                        <th>제목</th>
                        <th>내용</th>
                        <th>등록자</th>
                        <th>수정자</th>
                        <th>등록 시간</th>
                        <th>수정 시간</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {noticeList && noticeList.map((list) => {
                        return (
                        <tr key={list.noticeSn}>

                            <td>{list.noticeSn}</td>
                            <td>{list.noticeTitle}</td>
                            <td>{list.noticeContent}</td>
                            <td>{list.frstRegistMembSn}</td>
                            <td>{list.lastChangeMembSn}</td>
                            <td>{(dayjs(list.frstRegistDt).format('YYYY년MM월DD일 hh시mm분 A'))}</td>
                            <td>{(dayjs(list.lastChangeDt).format('YYYY년MM월DD일 hh시mm분 A'))}</td>
                            <td><Button onClick={() => {noticeUpdate(list.noticeSn)}} value="수정"/></td>
                        </tr>
                        );
                    })}





                </tbody>
            </table>
        </div>
    )
}

export default NoticePagingComponent ;