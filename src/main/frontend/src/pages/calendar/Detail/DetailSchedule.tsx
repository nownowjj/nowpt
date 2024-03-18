import React, {useEffect, useState} from 'react';
// import {ScheduleDetailType} from "../CalendarPage";
import styled from "styled-components";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {getMyDay} from "../../../services/formattingDay";
import {ScheduleDetailType} from "../../../model/CalendarApiModel";
import {deleteSchedule, ScheduleSn} from "../../../api/ScheduleApi";
import {useQueryClient} from "react-query";
import ConfirmComponent from "../component/ConfirmComponent";
import {BiTrash} from "react-icons/bi";
import Base from "../../../component/BottomSheet/Base";
import ScheduleDetailComponent from "./ScheduleDetailComponent";
import {useDispatch} from "react-redux";
import {setInvisible, setVisible} from "../../../redux/slice/bottomSheetSlice";
import ErrorComponent from "../../../component/ErrorComponent";
import ScheduleAddComponent from "./ScheduleAddComponent";

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


    const [isNew , setIsNew] = useState(false);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const [selectSchedule, setSelectSchedule] = useState<ScheduleDetailType|null>();
    // 일정을 클릭 하였음
    const scheduleClick =(data:ScheduleDetailType)=>{
        setIsNew(false)
        setSelectSchedule(data);
        dispatch(setVisible());
    }

    // 일정 삭제 요청
    const deleteScheduleCallBack =async () => {
        if(selectSchedule && selectSchedule.scheduleSn) {
            let param: ScheduleSn = {scheduleSn: selectSchedule.scheduleSn};
            const {data} = await deleteSchedule(param);
            data ?
                deleteSuccess(selectSchedule.scheduleSn) :
                confirmFunction(() => {}, "삭제 실패");
        }
    }

    // 삭제 성공
    const deleteSuccess =(scheduleSn:number)=>{
        setScheduleData(scheduleData && scheduleData.filter(item => item.scheduleSn !== scheduleSn)); // 삭제 성공 -> 삭제한 sn useState에서 제외
        dispatch(setInvisible())
        queryClient.invalidateQueries(['mySchedule', ymKeyDay]) // 쿼리 refetch
    }

    // 일정 등록
    const handleNewSchedule =()=>{
        setIsNew(true)
        dispatch(setVisible());
    }




    return (
        <>
        <DetailScheduleWrap>
            {selectSchedule
                &&
                <Base bottomComponent={
                    isNew ?
                    <ScheduleAddComponent/> :
                    <ScheduleDetailComponent
                        data={selectSchedule}
                        deleteFunction={()=> confirmFunction(()=> deleteScheduleCallBack() ,`정말<br/> 삭제 하시겠습니까?` )}
                    />
                }/>
            }

            <Swiper
                spaceBetween={15}
                slidesPerView={2}
                direction="horizontal"
            >
                {
                    scheduleData != null && scheduleData.length > 0   ?
                        scheduleData.map((item , index)=>(
                            <SwiperSlide   key={index}> {/* Adjust SwiperSlide width */}
                                <ScheduleItem onClick={()=> item.scheduleSn && scheduleClick(item)}>
                                    <div><ColorBox color={item.color}/></div>
                                    <div>
                                        <ScheduleTitle>{item.title}</ScheduleTitle>
                                        <ScheduleDate>{item.startDate === item.endDate ? getMyDay(item.startDate) : `${getMyDay(item.startDate)}~${getMyDay(item.endDate)}` }</ScheduleDate>
                                    </div>
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
            <ScheduleAddText onClick={()=> handleNewSchedule()}>일정 등록</ScheduleAddText>

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

        </>
    );
};

const ScheduleAddText = styled.div`
    text-align: right;
    padding-right: 10px;
    font-weight: 500;
    color: gray;
    font-size: 14px;
    margin-top: 10px;
`
const DetailScheduleWrap = styled.div`
    padding: 5px 0 5px 10px;
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
export const ColorBox=styled.div<{color:string}>`
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
export const ScheduleDate=styled.div`
  font-size: 12px;
  color: gray;
`
const NotSchedule=styled.div`
  font-size: 14px;
  color: gray;
  margin: 10px;
`
export default DetailSchedule;