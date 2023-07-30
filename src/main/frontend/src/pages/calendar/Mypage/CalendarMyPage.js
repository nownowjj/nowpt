import React, {useEffect, useState} from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import {useNavigate} from "react-router-dom";
import ProfileComponent from "../../../component/ProfileComponent";
import styled from "styled-components";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import dayjs from "dayjs";
import {getMyInfoAndRecord} from "../../../api/CalendarApi";
import CalendarBottomMenu from "../Bottom/CalendarBottomMenu";
import MyPageRecordSmComponent from "./MyPageRecordSmComponent";
import {useDispatch} from "react-redux";
import {logoutAction} from "../../../redux/slice/userSlice";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import ConfirmComponent from "../component/ConfirmComponent";

const CalendarMyPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 해당 멤버 정보
    const [membInfo, setMembInfo] = useState([""]);
    const [isLoading, setIsLoading] = useState(true);
    const [recordList, setRecordList] = useState([]);

    // Alert 여부
    const [showAlert , setShowAlert] = useState(false);
    const [okCallBackFn, setOkCallBackFn] = useState(null);
    const [messageCall, setMessageCall] = useState('');

    useEffect(() => {
        AOS.init();
    },[])


    // year을 group하고 해당 group 마다 month와 monthCounts 배열 생성
    useEffect(() => {
        getMyInfoAndRecord()
            .then(response => {
                setMembInfo(response.data.member[0]);
                setRecordList(response.data.myRecordSmList);
        }).catch(error => {
            ApiErrorHandle(navigate,error)
            }).finally(()=>{
                setIsLoading(false);
        })
    }, []);



    const confirmFunction =(okCallBack , message)=>{ // confirm 이벤트
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }

    const logoutFunction = () => dispatch(logoutAction()); // 로그아웃 이벤트
    return (
        <MyPageWrap>
            {/* 상단 gnb */}
            <TopGnbComponent page={'마이페이지'}/>
            {/* 상단 gnb */}

            {/* 프로필 */}
            <ProfileComponent style={{marginTop:"60px"}} naviUse={false} size={150} />
            {/* 프로필 */}

            {/* 개인정보 */}
            <ProfileItemBox>
                <ProfileItem>
                    <ProfileItemLeft>성함</ProfileItemLeft>
                    <ProfileItemRight>{membInfo.membNm}</ProfileItemRight>
                </ProfileItem>
                <ProfileItem>
                    <ProfileItemLeft>이메일</ProfileItemLeft>
                    <ProfileItemRight>{membInfo.emailAddr}</ProfileItemRight>
                </ProfileItem>
                <ProfileItem>
                    <ProfileItemLeft>가입수단</ProfileItemLeft>
                    <ProfileItemRight>{membInfo.subscriptionMethod}</ProfileItemRight>
                </ProfileItem>
                <ProfileItem borderBottom="none">
                    <ProfileItemLeft>가입일자</ProfileItemLeft>
                    <ProfileItemRight>{(dayjs(membInfo.frstRegistDt).format('YYYY년 MM월DD일'))}</ProfileItemRight>
                </ProfileItem>
            </ProfileItemBox>
            {/* 개인정보 */}

            {/* 기록 통계 */}
            <>
                {
                    isLoading
                        ?
                        '로딩중':
                        <MyPageRecordSmComponent recordList={recordList}/>
                }
            </>
            {/* 기록 통계 */}

            {/* 로그아웃 버튼 */}
            <LogOutButton onClick={()=> confirmFunction(logoutFunction ,`정말<br/> 로그아웃 하시겠습니까?` )}>로그아웃</LogOutButton>
            {/* 로그아웃 버튼 */}


            {/*바텀 메뉴*/}
            <CalendarBottomMenu/>
            {/*바텀 메뉴*/}

            {/* confirm 영역 */}
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
            {/* confirm 영역 */}

        </MyPageWrap>

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

const ProfileItem= styled.div`
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
    padding:0 10px ;
    width:100%;
    height:fit-content;
    flex-direction:column;
    align-items: center;
    padding-bottom: 70px;
`
export default CalendarMyPage;