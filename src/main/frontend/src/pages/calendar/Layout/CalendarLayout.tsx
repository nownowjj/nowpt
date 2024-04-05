import React from 'react';
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import CalendarBottomMenu from "../Bottom/CalendarBottomMenu";
import ConfirmLayout from "./ConfirmLayout";

interface CalendarLayoutInterface {
    children: JSX.Element ;
    gnbTitle?: string;
    gnbSubElement?: JSX.Element;
    useBottom?:boolean;
}

/**
 * @param children       CalendarLayout 호출한 Page content
 * @param gnbTitle       gnbTitle    if null > gnb no use
 * @param gnbSubElement  gnbSub Element
 * @param useBottom      bottom menu 사용 여부
 */
const CalendarLayout = ({children  , gnbTitle , gnbSubElement , useBottom=true }:CalendarLayoutInterface) => {
    return (
        <div>
            {gnbTitle && <TopGnbComponent page={gnbTitle} subTitle={gnbSubElement}/>}
            {children}
            {useBottom && <CalendarBottomMenu/>}

            <ConfirmLayout/>
        </div>
    );
};

export default CalendarLayout;