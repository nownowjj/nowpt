import React, {useEffect, useState} from 'react';
import {deleteAllNotification, getMyNotification, updateNotification} from "../../../api/NotificationApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import LoadingComponent from "../../LoadingComponent";
import styled from "styled-components";
import {useInView} from "react-intersection-observer";
import NotificationComponent from "./NotificationComponent";
import CalendarDetailNo from "../component/CalendarDetailNo";

const NotificationPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ref, inView] = useInView();
    const[pageNumber,setPageNumber] = useState(0);
    const[last,setLast] = useState(false);

    const [notificationList , setNotificationList] = useState([]);

    useEffect(()=>{
        getMyNotification(pageNumber)
            .then((response)=>{
                if(!last) {
                    //첫번쨰 페이지이자 마지막 페이지 일 경우
                    if (response.data.first && response.data.last) {
                        console.log('첫번쨰이자 마지막임');
                        setLast(true);
                        return response.data.content;
                    }
                    if(response.data.last) setLast(true);
                    return response.data.content;
                }
            }).then(data =>{
            setNotificationList((itemLists) => itemLists.concat(data));
            }).catch((error)=>{
                ApiErrorHandle(error)
            }).finally(()=>{
                setIsLoading(false)
            });
    },[pageNumber,last])

    useEffect(()=>{
        if(notificationList.length !== 0 && inView) {
            console.log('첫 로딩 이후 무한 스크롤');
            if (last) return;
            setPageNumber(pageNumber + 1)
        }
    },[inView,pageNumber,notificationList.length,last]);


    const deleteAllNotiFn=()=>{
        deleteAllNotification()
            .then(response=>{
                console.log(response);
                setNotificationList([]);
            }).catch(error=>{
                ApiErrorHandle(error)
        })
    }

    let updateParam = {};
    const updateNotiFn=(notificationSn)=>{
        console.log("updateNotiFn");
        console.log(notificationSn);
        const recordIndex = notificationList.findIndex((data) => data.notificationSn === notificationSn); // 삭제 요청이 들어온 객체의 index를 찾음
        updateParam.notificationSn = notificationSn; // 요청 파라미터에 Sn 저장
        updateNotification(updateParam)
            .then(response=>{
                console.log(response);
                if(response.message === "DESUCCESS") {
                    if (recordIndex !== -1) { // 삭제 요청이 성공 되었고 해당 요소의 index를 찾음
                       console.log(recordIndex);
                        const updatedNoti = [...notificationList]; // 새롭게
                        updatedNoti.splice(recordIndex, 1);
                        setNotificationList(updatedNoti);
                    }
                }
            }).catch(error=>{
            ApiErrorHandle(error)
        })
    }

    return (
        <>
            {/* 상단 gnb */}
            <TopGnbComponent page={'알림'}/>
            {/* 상단 gnb */}

            {/* 반복 출력시킬 element 영역 */}
            <ImportWrap>
                {isLoading ? (
                        <LoadingComponent/>
                    ) :
                    notificationList && notificationList.length > 0 ? (
                        notificationList.map((data) => (
                            <NotificationComponent
                                key={data.notificationSn}
                                data={data}
                                updateNoti={updateNotiFn}
                                deleteAllNoti={deleteAllNotiFn}
                            />
                        ))

                    ) : (
                        <CalendarDetailNo/>
                    )}
                {/*  스크롤 하단 감지 영역  */}
                <ObserverArea ref={ref} />
                {/*  스크롤 하단 감지 영역  */}
            </ImportWrap>
            {/* 반복 출력시킬 element 영역 */}




            {/* 하단 메뉴 */}
            {/*<CalendarBottomMenu/>*/}
            {/* 하단 메뉴 */}
        </>
    );
};



const ImportWrap =styled.div`
    height: fit-content;
    padding-top: 50px;
    padding-bottom: 50px;
    width:100%;
`

const ObserverArea = styled.div`
    width:1px;
    border-bottom:1px solid #e8e8e8;
`


export default NotificationPage;