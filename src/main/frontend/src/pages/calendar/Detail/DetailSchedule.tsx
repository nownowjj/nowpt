import React, {useState} from 'react';
// import {ScheduleDetailType} from "../CalendarPage";
import styled from "styled-components";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {getMyDay} from "../../../services/formattingDay";
import {ScheduleDetailType} from "../../../model/CalendarApiModel";
import {deleteSchedule, ScheduleSn} from "../../../api/ScheduleApi";
import {useQueryClient} from "react-query";
import ConfirmComponent from "../component/ConfirmComponent";

interface DetailScheduleProps {
    data: ScheduleDetailType[];
    ymKeyDay:string;
}

const DetailSchedule = ({data,ymKeyDay}:DetailScheduleProps) => {
    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();

    const confirmFunction = (okCallBack: () => void,  message:string)=>{
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }

    const queryClient = useQueryClient();

    const scheduleClick =(sn:number)=>{
        confirmFunction(()=> deleteScheduleCallBack(sn) ,'일정을 삭제합니다<br/>삭제한 일정을 복구할 수 없습니다')
    }

    const deleteScheduleCallBack =async (scheduleSn: number) => {
        let param: ScheduleSn = {scheduleSn: scheduleSn};
        const {data} = await deleteSchedule(param);
        data ? queryClient.invalidateQueries(['mySchedule', ymKeyDay]) : confirmFunction(()=>{} , "삭제 실패");
    }

    return (
        <DetailScheduleWrap>
            <Swiper
                spaceBetween={20}
                slidesPerView={2.3}
                direction="horizontal"
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => {}}
                // style={{ width: '100%', margin: '0 auto' }} // Set the Swiper width
            >
                {data.map((item , index)=>(
                    <SwiperSlide key={index} style={{ width: '40%' }}> {/* Adjust SwiperSlide width */}
                        <Item backGroundColor={item.color} onClick={()=> item.scheduleSn && scheduleClick(item.scheduleSn)}>
                            <p>{getMyDay(item.startDate)}~{getMyDay(item.endDate)}</p>
                            <p>{item.title}</p>
                        </Item>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 삭제전 Confirm */}
            {showAlert &&(
                <ConfirmComponent
                    message= {messageCall}
                    okCallBack={() => {
                        okCallBackFn && okCallBackFn(); // 확인 버튼 클릭 시, 콜백 함수를 실행
                        setShowAlert(false);
                    }}
                    onClose={()=> setShowAlert(false)}
                />
            )}
            {/* 삭제전 Confirm */}
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
    //border: 1px solid red;
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