import React, {useEffect, useState} from 'react'
import CalendarLib from 'react-calendar'
import './cal.css' // css import
import moment from 'moment';
import CalendarTitleContent from "./CalendarTitleContent";
import ProfileComponent from "../../component/ProfileComponent";
import CalendarHeaderBannerComponent from "./CalendarHeaderBannerComponent";

const CalendarComponent = () => {
    const [value, onChange] = useState(new Date());

    useEffect(()=>{
        console.log(moment(value).format('YYYY년 MM월 DD일'));
    },[])

    // 일자 click event
    const onClickDay = (value) =>{
        console.log(moment(value).format('YYYYMMDD'));
    }


    // event가 있는 일자 조회
    const mark = ['2023-07-15','2023-07-20'];


    return (
        <>
            <CalendarHeaderBannerComponent />
            <div className="header">
                <ProfileComponent size={45}/>
                <div>NowPT</div>
            </div>
            {/* 캘린더 */}
            <CalendarLib  // class  = "react-calendar"
                onChange={onChange}
                onClickDay={onClickDay}
                // minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                // maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                formatDay={(locale, date) => moment(date).format('DD')}
                value={value} // 일자
                tileContent={({date}) => <CalendarTitleContent date ={date} mark={mark} />} // 일자 하단에 이벤트 dot
                showNeighboringMonth={true} // 해당 월 일자만 보여줄지
            />
            {/* 캘린더 */}

            {/*바텀*/}
            <div className="bottom">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </div>
            {/*바텀*/}


            {/*<div className="text-gray-500 mt-4">{moment(value).format('YYYY년 MM월 DD일')}</div>*/}
        </>
    );
};

export default CalendarComponent;