import React, {useEffect, useState} from 'react'
import CalendarLib from 'react-calendar'
import './cal.css' // css import
import moment from 'moment';
import CalendarDotsContent from "./CalendarDotsContent";
import ProfileComponent from "../../component/ProfileComponent";
import CalendarHeaderBannerComponent from "./CalendarHeaderBannerComponent";
import CalendarDetailComponent from "./CalendarDetailComponent";
import CalendarBottomMenu from "./CalendarBottomMenu";
import {getMyCalendar} from "../../api/CalendarApi";
import CalendarWrap from "./component/CalendarWrapComponent";
import {useNavigate} from "react-router-dom";

const CalendarPage = () => {
    const [value, onChange] = useState(new Date());
    const [detail,setDetail] = useState("");
    const [mark , setMark] = useState([]);
    const [month , setMonth] = useState("");
    const navigate = useNavigate();


    // 월이 변경 될 경우
    const handleMonthChange = (date) => setMonth(moment(date.activeStartDate).format('YYYYMM'));

    let param = {};
    useEffect(()=>{
        param.recordDate = month ? month : moment(value).format('YYYYMM');  // 페이지 로드 시점 param : value  월 변경 이벤트 발생하면 param : month
        getMyCalendar(param)
            .then(response =>{setMark(response.data)})
            .catch(error =>{if(error.code === '4444') navigate("/go/login")})
    },[month,detail])


    const onClickDay =(value)=> setDetail(moment(value).format('YYYYMMDD'));   // 일자 click event
    const toggleDetail =()=> setDetail();                                             // detail toggle
    // const onViewChange =(e)=> console.log(e);
    // const onClickMonth =(e)=> console.log(e);




    return (
        <CalendarWrap>
            {/* 배너*/}
            <CalendarHeaderBannerComponent />
            {/* 배너*/}

            {/*헤더*/}
            <div className="header">
                <ProfileComponent size={45}/>
                <div></div>
            </div>
            {/*헤더*/}

            {/* 캘린더 */}
            <CalendarLib  // class  = "react-calendar"
                onChange={onChange}
                onClickDay={onClickDay}
                formatDay={(locale, date) => moment(date).format('DD')}
                value={value} // 일자
                tileContent={({date}) => <CalendarDotsContent date ={date} mark={mark} />} // 일자 하단에 이벤트 dot
                showNeighboringMonth={true} // 해당 월 일자만 보여줄지
                onActiveStartDateChange={handleMonthChange} // 월 변경 이벤트
                // onViewChange={onViewChange}
                // onClickMonth={onClickMonth}
                // minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                // maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            />
            {/* 캘린더 */}

            {/*바텀*/}
            <CalendarBottomMenu/>
            {/*바텀*/}


            {detail && <CalendarDetailComponent detailDay ={moment(value).format('YYYYMMDD')} noDetail={toggleDetail}/> }

        </CalendarWrap>
    );
};

// const CalendarWrap = styled.div`
//     width:100%;
//     height:100%;
// `

export default CalendarPage;