import React, {useEffect, useState} from 'react';
import {deleteAllNotification, getMyNotification, updateNotification} from "../../../api/NotificationApi";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import LoadingComponent from "../../LoadingComponent";
import styled from "styled-components";
import {useInView} from "react-intersection-observer";
import NotificationComponent from "./NotificationComponent";
import CalendarDetailNo from "../component/CalendarDetailNo";
import {NotificationDto, NotificationSn} from "../../../model/NotificationApiModel";
import {CalendarDto} from "../../../model/CalendarApiModel";

const NotificationPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [ref, inView] = useInView();
    const[pageNumber,setPageNumber] = useState<number>(0);
    const[last,setLast] = useState<boolean>(false);

    const [notificationList , setNotificationList] = useState<NotificationDto[]>([]);

    useEffect(()=>{
        getMyNotification(pageNumber)
            .then((response)=>{
                if(!last) {
                    if (response.data.first && response.data.last) {
                        setLast(true);
                        return response.data.content;
                    }
                    if(response.data.last) setLast(true);
                    return response.data.content;
                }
            }).then((content:NotificationDto[] | undefined) =>{
            if (content) setNotificationList((prevData) => prevData.concat(content));
        }).catch(error => {
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

    const updateNotiFn=(notificationSn:number)=>{
        console.log("updateNotiFn");
        console.log(notificationSn);
        const recordIndex = notificationList.findIndex((data) => data.notificationSn === notificationSn); // 삭제 요청이 들어온 객체의 index를 찾음
        const updateParam:NotificationSn={notificationSn:notificationSn};
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