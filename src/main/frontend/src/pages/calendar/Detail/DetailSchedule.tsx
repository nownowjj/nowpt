import React, {useEffect, useState} from 'react';
// import {ScheduleDetailType} from "../CalendarPage";
import styled from "styled-components";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {getMyDay} from "../../../services/formattingDay";
import {ScheduleDetailType, ScheduleType} from "../../../model/CalendarApiModel";
import {deleteSchedule, ScheduleSn} from "../../../api/ScheduleApi";
import {useQueryClient} from "react-query";
import ConfirmComponent from "../component/ConfirmComponent";
import {BiTrash} from "react-icons/bi";

interface DetailScheduleProps {
    data: ScheduleDetailType[];
    ymKeyDay:string;
}

const DetailSchedule = ({data,ymKeyDay}:DetailScheduleProps) => {
    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();

    const [scheduleData , setScheduleData] = useState<ScheduleDetailType[] | null>(data);

    // 스케줄 데이터 set
    useEffect(() => {
        console.log(data);
        setScheduleData(data);
    }, [data]);

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
        data ?  deleteSuccess(scheduleSn) : confirmFunction(()=>{} , "삭제 실패");
    }

    const deleteSuccess =(scheduleSn:number)=>{
        setScheduleData(scheduleData && scheduleData.filter(item => item.scheduleSn !== scheduleSn)); // 삭제 성공 -> 삭제한 sn useState에서 제외
        queryClient.invalidateQueries(['mySchedule', ymKeyDay]) // 쿼리 refetch
    }

    const insertScdule =()=>{

    }


    return (
        <DetailScheduleWrap>
            <Swiper
                spaceBetween={15}
                slidesPerView={2.2}
                direction="horizontal"
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => {}}
                // style={{ width: '100%', margin: '0 auto' }} // Set the Swiper width
            >
                {
                    scheduleData != null && scheduleData.length > 0   ?
                        scheduleData.map((item , index)=>(
                            <SwiperSlide   key={index}> {/* Adjust SwiperSlide width */}
                                <ScheduleItem onClick={()=> item.scheduleSn && scheduleClick(item.scheduleSn)}>
                                    <div><ColorBox color={item.color}/></div>
                                    <div>
                                        <ScheduleTitle>{item.title}</ScheduleTitle>
                                        <ScheduleDate>{item.startDate === item.endDate ? getMyDay(item.startDate) : `${getMyDay(item.startDate)}~${getMyDay(item.endDate)}` }</ScheduleDate>
                                    </div>
                                    <div><BiTrash  style={{marginRight : "3px"}} onClick={()=> confirmFunction(()=>{} ,`정말<br/> 삭제 하시겠습니까?` )} /></div>
                                </ScheduleItem>
                            </SwiperSlide>
                        ))
                    :
                        <SwiperSlide key="empty">
                            <ScheduleItem>
                                <NotSchedule>오늘의 일정이 없습니다</NotSchedule>
                            </ScheduleItem>
                        </SwiperSlide>
                }
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


            {/*<BottomSlideWrap>*/}
            {/*    <div></div>*/}
            {/*</BottomSlideWrap>*/}

        </DetailScheduleWrap>

    );
};

const DetailScheduleWrap = styled.div`
    padding: 5px 0 5px 5px;
    margin-top: 55px;
    border-bottom: 1px solid #e8e8e8;
`
const ScheduleItem=styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width:fit-content;
  gap:10px
`
const ColorBox=styled.div<{color:string}>`
  background-color: ${({color}) => color};
  width:20px;
  height: 20px;
  border-radius: 40%;
  margin-top: 5px;
`
const ScheduleTitle=styled.div`
  font-size: 14px;
  overflow: hidden;
  //width:120px;
  //white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`
const ScheduleDate=styled.div`
  font-size: 12px;
  color: gray;
`
const NotSchedule=styled.div`
  font-size: 14px;
  color: gray;
  margin: 10px 0;
`
export default DetailSchedule;