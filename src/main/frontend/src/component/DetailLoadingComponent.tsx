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
                    <DetailTitle><LoadingDotComponent delay={true} size={12}/></DetailTitle>
                    <DetailContent><LoadingDotComponent delay={true} loop={5} size={7}/></DetailContent>
                    <DetailTimeAndFixDelete><LoadingDotComponent loop={5} size={8}/></DetailTimeAndFixDelete>
                </DetailContentWrap>
            ))}
        </>
    );
}
export default DetailLoadingComponent;