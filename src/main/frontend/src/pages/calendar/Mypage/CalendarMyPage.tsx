import React, {useState} from "react";
import "aos/dist/aos.css";
import ProfileComponent from "../../../component/ProfileComponent";
import styled from "styled-components";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import dayjs from "dayjs";
import {getMyInfoAndRecord} from "../../../api/CalendarApi";
import CalendarBottomMenu from "../Bottom/CalendarBottomMenu";
import MyPageRecordSmComponent from "./MyPageRecordSmComponent";
import {useDispatch} from "react-redux";
import {logoutAction} from "../../../redux/slice/userSlice";
import ConfirmComponent from "../component/ConfirmComponent";
import Aos from "aos";
import {useQuery} from "react-query";


interface ProfileItemProps{
    borderBottom:string|null;
}

const CalendarMyPage = () => {
    const dispatch = useDispatch();
    // 해당 멤버 정보

    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();

    // useEffect(() => {
    Aos.init();
    // },[])


    const { isLoading, error, data:myInfo, isFetching } = useQuery({
        queryKey: ['myInfoData'],
        queryFn: async () => {
            const result = await getMyInfoAndRecord();
            return result.data;
        },
        staleTime: 60 * 1000, // 1분
    })

    const confirmFunction = (okCallBack: () => void,  message:string)=>{
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }


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
                    <ProfileItemRight>{(dayjs(myInfo?.member[0].frstRegistDt).format('YYYY년 MM월DD일'))}</ProfileItemRight>
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

            {/* 로그아웃 버튼 */}
            <LogOutButton onClick={()=> confirmFunction(()=> dispatch(logoutAction()) ,`정말<br/> 로그아웃 하시겠습니까?` )}>로그아웃</LogOutButton>
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
    padding:0 10px ;
    width:100%;
    height:fit-content;
    flex-direction:column;
    align-items: center;
    padding-bottom: 70px;
`
export default CalendarMyPage;