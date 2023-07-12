import React from 'react';
import CalendarWrap from "./component/CalendarWrapComponent";
import CalendarHeaderBannerComponent from "./CalendarHeaderBannerComponent";
import ProfileComponent from "../../component/ProfileComponent";
import CalendarBottomMenu from "./CalendarBottomMenu";

const CalendarMyPage = () => {
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


            {/*바텀*/}
            <CalendarBottomMenu/>
            {/*바텀*/}

        </CalendarWrap>
    );
};

export default CalendarMyPage;