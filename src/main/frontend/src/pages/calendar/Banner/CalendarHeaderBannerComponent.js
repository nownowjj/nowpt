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
                spaceBetween={10}
                slidesPerView={1}
                navigation
                loop={true}
                autoplay={{ delay: 100 }}
                effect={'fade'}
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