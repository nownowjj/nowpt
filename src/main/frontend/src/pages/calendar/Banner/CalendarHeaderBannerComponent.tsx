import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CalendarHeaderBannerComponent = () => {
    return (
        <CalendarHeaderBannerWrap>
            <Slider
                dots={false}
                infinite={true}
                speed={1000} // Time in milliseconds between each slide change
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={5000} // Time in milliseconds to wait before moving to the next slide
                fade={true}
            >
                <BannerItem>NowNowjj</BannerItem>
                <BannerItem>Calendar App</BannerItem>
                <BannerItem>My Record</BannerItem>
            </Slider>
        </CalendarHeaderBannerWrap>
    );
};
const BannerItem = styled.div`
    padding: 3px 6px;
    font-size:14px;
    font-weight:bold;
`
const CalendarHeaderBannerWrap = styled.div`
  padding: 0 6px;
  font-size: 14px;
`;

export default CalendarHeaderBannerComponent;
