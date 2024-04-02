import React from "react";
import {
    DetailContent,
    DetailContentWrap,
    DetailTimeAndFixDelete, DetailTitle
} from "../pages/calendar/Detail/CalendarDetailContentComponent";
import LoadingDotComponent from "./LoadingDotComponent";

const DetailLoadingComponent =({size=4})=> {
    return (
        <>
            {[...Array(size)].map((_, index) => (
                <DetailContentWrap key={index}>
                    <DetailTitle><LoadingDotComponent size={15}/></DetailTitle>
                    <DetailContent><LoadingDotComponent delay={true} loop={5} size={9}/></DetailContent>
                    <DetailTimeAndFixDelete><LoadingDotComponent loop={5} size={10}/></DetailTimeAndFixDelete>
                </DetailContentWrap>
            ))}
        </>
    );
}
export default DetailLoadingComponent;