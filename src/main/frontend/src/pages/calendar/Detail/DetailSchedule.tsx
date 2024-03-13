import React from 'react';
// import {ScheduleDetailType} from "../CalendarPage";
import styled from "styled-components";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {getMyDay} from "../../../services/formattingDay";
import {ScheduleDetailType} from "../../../model/CalendarApiModel";

interface DetailScheduleProps {
    data: ScheduleDetailType[];
}

const DetailSchedule = ({data}:DetailScheduleProps) => {

    const scheduleClick =(data:ScheduleDetailType)=>{
        console.log(data);
    }

    return (
        <DetailScheduleWrap>
            <Swiper
                spaceBetween={20}
                slidesPerView={2.3}
                direction="horizontal"
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                // style={{ width: '100%', margin: '0 auto' }} // Set the Swiper width
            >
                {data.map((data , index)=>(
                    <SwiperSlide key={index} style={{ width: '40%' }}> {/* Adjust SwiperSlide width */}
                        <Item backGroundColor={data.color} onClick={()=> scheduleClick(data)}>
                            <p>{getMyDay(data.startDate)}~{getMyDay(data.endDate)}</p>
                            <p>{data.title}</p>
                            <div>ss</div>
                        </Item>
                    </SwiperSlide>
                ))}
            </Swiper>
        </DetailScheduleWrap>

    );
};
const DetailScheduleWrap = styled.div`
    padding: 5px 0 5px 10px;
    margin-top: 55px;
`

const Item = styled.div<{backGroundColor:string}>`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    border: 1px solid red;
    border-radius: 10px;
    padding: 10px;
    height: 70px;
    width: 100%;
    user-select: none;
    color: white;
    font-size: 14px;
    background-color: ${({ backGroundColor }) => backGroundColor};
`
export default DetailSchedule;