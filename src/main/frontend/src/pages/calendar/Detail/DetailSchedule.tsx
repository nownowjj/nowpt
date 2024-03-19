import React, {useEffect, useState} from 'react';
// import {ScheduleDetailType} from "../CalendarPage";
import styled from "styled-components";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {getMyDay, getYmdDay} from "../../../services/formattingDay";
import {ScheduleDetailType} from "../../../model/CalendarApiModel";
import {deleteSchedule, insertScheduleApi, ScheduleSn} from "../../../api/ScheduleApi";
import {useQueryClient} from "react-query";
import ConfirmComponent from "../component/ConfirmComponent";
import Base from "../../../component/BottomSheet/Base";
import {useDispatch, useSelector} from "react-redux";
import {setInvisible, setVisible} from "../../../redux/slice/bottomSheetSlice";
import ScheduleAddComponent from "./ScheduleAddComponent";
import {RootState} from "../../../redux/store/store";

interface DetailScheduleProps {
    data: ScheduleDetailType[];
}

const DetailSchedule = ({data}:DetailScheduleProps) => {
    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();

    const selectedDay = useSelector((state: RootState) => state.calendar.selectedDay);
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
    const dispatch = useDispatch();
    const [selectSchedule, setSelectSchedule] = useState<ScheduleDetailType|null>();

    // 일정을 클릭 하였음 Bottom Sheet open
    const scheduleClick =(data:ScheduleDetailType)=>{
        setSelectSchedule(data);
        dispatch(setVisible());
    }

    // 일정 삭제 요청
    const deleteScheduleCallBack =async () => {
        if(selectSchedule && selectSchedule.scheduleSn) {
            let param: ScheduleSn = {scheduleSn: selectSchedule.scheduleSn};
            const {data} = await deleteSchedule(param);
            data ?
                deleteSuccess(data) :
                confirmFunction(() => {}, "삭제 실패");
        }
    }

    // 삭제 성공
    const deleteSuccess =(data:ScheduleDetailType)=>{
        setScheduleData(scheduleData && scheduleData.filter(item => item.scheduleSn !== data.scheduleSn)); // 삭제 성공 -> 삭제한 sn useState에서 제외
        dispatch(setInvisible())
        invalidateQueriesFunction(data)
    }

    // 일정 등록 Sheet open
    const handleNewSchedule =()=>{
        setSelectSchedule(null);
        dispatch(setVisible());
    }

    /**
     * 일정 등록 및 수정 요청
     * @param pararm {startDate , endDate , title, color , scheduleSn? }
     */
    const insertSchedule= async (param:ScheduleDetailType)=>{
        const {data} = await insertScheduleApi(param);
        data ?
            insertSuccessCallback(data , param.scheduleSn) :
            confirmFunction(() => {}, "등록 실패");
    }

    // 일정 등록 성공 콜백
    const insertSuccessCallback= (data: ScheduleDetailType, scheduleSn: number | undefined)=>{
        dispatch(setInvisible());

        // 수정 요청이라면 해당 sn은 state에서 제거한 후 다시 set 하도록 하자
        if(scheduleSn) setScheduleData(scheduleData && scheduleData.filter(item => item.scheduleSn !== data.scheduleSn));
        // 방금 저장된 일정이 현재 보고 있는 일자에 포함됨
        if(data.startDate <= getYmdDay(selectedDay) && data.endDate >= getYmdDay(selectedDay)) {
            setScheduleData(prevData => prevData ? [...prevData, data] : [data]);
        }
        invalidateQueriesFunction(data)
    }


    // 삭제,등록,수정 된 일정의 일자를 체크하여  invalidateQueries 수행
    const invalidateQueriesFunction =(data:ScheduleDetailType)=>{
        let invalidateYmd = [];
        let startDate = data.startDate;
        let endDate =data.endDate;

        // startDate와 endDate를 Date 객체로 변환
        const startYear = parseInt(startDate.substr(0, 4));
        const endYear = parseInt(endDate.substr(0, 4));
        const startMonth = parseInt(startDate.substr(4, 2));
        const endMonth = parseInt(endDate.substr(4, 2));

        for (let year = startYear; year <= endYear; year++) {
            const startMonthValue = year === startYear ? startMonth : 1;
            const endMonthValue = year === endYear ? endMonth : 12;
            for (let month = startMonthValue; month <= endMonthValue; month++) {
                // @ts-ignore
                const yyyymm = `${year}${String(month).padStart(2, '0')}`;
                invalidateYmd.push(yyyymm);
            }
        }
        invalidateQueriesForItems(invalidateYmd);
    }

    // CRUD 요청시에 변경된 일자에 따른 query invalidate
    const invalidateQueriesForItems = (invalidateItem:string[]) => {
        invalidateItem.forEach(item => {
            queryClient.invalidateQueries(['mySchedule', item]);
        });
    };

    return (
        <>
        <DetailScheduleWrap>
                <Base
                    bottomComponent={
                            <ScheduleAddComponent
                                insertFunction={insertSchedule}
                                deleteFunction={()=> confirmFunction(()=> deleteScheduleCallBack() ,`정말<br/> 삭제 하시겠습니까?` )}
                                data={selectSchedule}
                    />}/>

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
            <ScheduleAddText><span onClick={()=> handleNewSchedule()}>일정 등록</span></ScheduleAddText>

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
    //margin-top: 55px;
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
  //margin-top: 5px;
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