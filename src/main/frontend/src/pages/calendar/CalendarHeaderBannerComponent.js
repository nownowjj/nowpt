import React from 'react';
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const CalendarHeaderBannerComponent = () => {

    return (
        <CalendarHeaderBannerWrap>
            <Swiper
                spaceBetween={10} //SwiperSlide 사이에 간격을 의미합니다.
                slidesPerView={1} //한 번에 보여지는 slide 개수를 나타낸다.
                navigation
                loop={true}
                autoplay={{ delay: 3000 }}
                effect={"fade"}
                pagination={{
                    clickable: true,
                }}
            >
                <SwiperSlide>
                    <div>캘린더 앱</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>열심히 기록합시다</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>가보자구~</div>
                </SwiperSlide>
            </Swiper>
        </CalendarHeaderBannerWrap>
    );
};

const CalendarHeaderBannerWrap = styled.div`
    padding: 0 6px; 
    font-size: 14px;
`


export default CalendarHeaderBannerComponent;