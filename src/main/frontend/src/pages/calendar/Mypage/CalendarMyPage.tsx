import React, {useEffect, useState} from "react";
import "aos/dist/aos.css";
import ProfileComponent from "../../../component/ProfileComponent";
import styled from "styled-components";
import {getMyInfoAndRecord} from "../../../api/CalendarApi";
import MyPageRecordSmComponent from "./MyPageRecordSmComponent";
import {useDispatch} from "react-redux";
import {logoutAction} from "../../../redux/slice/userSlice";
import Aos from "aos";
import {useQuery} from "react-query";
import CalendarLayout from "../Layout/CalendarLayout";
import {getData} from "../../../api/Api";
import {useConfirm} from "../../../hooks/useConfirm";
import {getFormatDay} from "../../../services/formattingDay";
import {uploadImage} from "../../../api/ImageApi";
import ProfileImageFixComponent from "./ProfileImageFixComponent";


interface ProfileItemProps{
    borderBottom:string|null;
}

const CalendarMyPage = () => {
    const dispatch = useDispatch();
    const { confirmFunction } = useConfirm();
    Aos.init();

    const [isEdit , setEdit] = useState(false);

    const {data:myInfo , isFetching} = useQuery(['myInfoData'], () => getData(getMyInfoAndRecord,{} ,500 ),{
        staleTime: 60 * 1000, // 1분
    });



    return (
        <CalendarLayout gnbTitle={"마이페이지"}>
        <MyPageWrap>
            {/* 프로필 */}
            <ProfileWrap>
                <EditBtn>{
                    isEdit ?
                        <span onClick={()=> setEdit(false)}>취소</span> :
                        <span onClick={()=>setEdit(true)}>프로필 변경</span>
                }</EditBtn>
                {isEdit?
                    <ProfileImageFixComponent/> :
                    <ProfileComponent isMy={true} naviUse={false} size={150} />
                }
            </ProfileWrap>
            {/* 프로필 */}

            {/* 개인정보 */}
            <ProfileItemBox>
                <ProfileItem borderBottom={null}>
                    <ProfileItemLeft>성함</ProfileItemLeft>
                    <ProfileItemRight>{myInfo?.member[0].membNm}</ProfileItemRight>
                </ProfileItem>
                <ProfileItem borderBottom={null}>
                    <ProfileItemLeft>이메일</ProfileItemLeft>
                    <ProfileItemRight>{myInfo?.member[0].emailAddr}</ProfileItemRight>
                </ProfileItem>
                <ProfileItem borderBottom={null}>
                    <ProfileItemLeft>가입수단</ProfileItemLeft>
                    <ProfileItemRight>{myInfo?.member[0].subscriptionMethod}</ProfileItemRight>
                </ProfileItem>
                <ProfileItem borderBottom="none">
                    <ProfileItemLeft>가입일자</ProfileItemLeft>
                    <ProfileItemRight>{myInfo && getFormatDay( myInfo?.member[0].frstRegistDt , 'YYYY년 MM월DD일') } </ProfileItemRight>
                </ProfileItem>
            </ProfileItemBox>
            {/* 개인정보 */}

            {/* 기록 통계 */}
            <>
                {
                    isFetching
                        ? '...'
                        : myInfo && <MyPageRecordSmComponent recordList={myInfo.myRecordSmList} />
                }
            </>
            {/* 기록 통계 */}

            <LogOutButton onClick={()=> confirmFunction(()=> dispatch(logoutAction()) ,`정말<br/> 로그아웃 하시겠습니까?` )}>로그아웃</LogOutButton>

        </MyPageWrap>
        </CalendarLayout>

    )
}
const LogOutButton= styled.div`
    margin-top:20px;
    color:gray;
    font-weight:bold;
`

const ProfileItemRight = styled.div`
    color:gray;
`

const ProfileItemLeft = styled.div`
    font-weight:600;
    font-size:16px;
`
const ProfileItem= styled.div<ProfileItemProps>`
    width:100%;
    padding:15px 10px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    border-bottom : ${({borderBottom}) => (borderBottom ? `${borderBottom}` : `1px solid #e8e8e8` )} ;
`

const ProfileItemBox = styled.div`
    width:90%;
    display:flex;
    border-radius:15px;
    flex-direction:column;
    border:1px solid #e8e8e8;
    margin-top:30px;
`

const MyPageWrap = styled.div`
    display:flex;
    position:relative;
    padding:50px 10px 70px;
    width:100%;
    height:fit-content;
    flex-direction:column;
    align-items: center;
    max-width: 720px;
    margin:0 auto;
`

const ProfileWrap = styled.div`
  width: 100%;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  position: relative;
`

const EditBtn = styled.p`
  position: absolute;
  right:20px;
`

export default CalendarMyPage;