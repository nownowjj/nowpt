import React from 'react';
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import SwiperCore, { Autoplay } from 'swiper';
// SwiperCore.use([Autoplay]);
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
                    <div>www</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>zzz</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>ddd</div>
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