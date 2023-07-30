import React, {useEffect, useState} from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import CountUp from "react-countup";
import {useNavigate} from "react-router-dom";
import ProfileComponent from "../../../component/ProfileComponent";
import styled from "styled-components";
import TopGnbComponent from "../component/TopGnbComponent";
import ConfirmComponent from "../../../component/ConfirmComponent";
import {isNotLogin, route} from "../../../services/remocon";
import dayjs from "dayjs";
import {getMyInfoAndRecord} from "../../../api/CalendarApi";
import CalendarBottomMenu from "../Bottom/CalendarBottomMenu";
import MyRecordSmComponent from "../component/MyRecordSmComponent";
import {useDispatch} from "react-redux";
import {logoutAction} from "../../../redux/slice/userSlice";
import ApiErrorHandle from "../../../services/ApiErrorHandle";

const MyPageComponent = () => {
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
                console.log('로딩해제');
        })
    }, []);



    const confirmFunction =(okCallBack , message)=>{
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }
    const navigateToCalendar = () => navigate(route.calendar);
    const logoutFunction = () => dispatch(logoutAction());
    return (
        <MyPageWrap>
            <TopGnbComponent page={'마이페이지'}/>
            <ProfileComponent style={{marginTop:"60px"}} naviUse={false} size={150} />
            <div>가입일자 : {(dayjs(membInfo.frstRegistDt).format('YYYY년 MM월DD일'))}</div>
            <div>성함 : {membInfo.membNm}</div>
            <div>이메일 : {membInfo.emailAddr}</div>

            {
                isLoading
                    ?
                    '로딩중':
                    <MyRecordSmComponent recordList={recordList}/>
            }

            {
                isLoading
                    ?
                    '로딩중':
                    <MyRecordSmComponent recordList={recordList}/>
            }



            <div onClick={()=> confirmFunction(navigateToCalendar ,'캘린더로 이동!' )}>캘린더로 이동</div>
            <div onClick={()=> confirmFunction(logoutFunction ,`정말<br/> 로그아웃 하시겠습니까?` )}>로그아웃</div>


            <CountUp end={100} duration={0.7}/>
            {/*바텀*/}
            <CalendarBottomMenu/>
            {/*바텀*/}


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
        </MyPageWrap>

    )
}

const MyPageWrap = styled.div`
    display:flex;
    position:relative;
    padding:0 10px ;
    width:100%;
    height:100%;
    flex-direction:column;
    align-items: center;
`
export default MyPageComponent;