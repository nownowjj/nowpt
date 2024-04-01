import React, {useState} from 'react';
import styled from "styled-components";
import {ColorBox} from "./DetailSchedule";
import {IoMdCheckmark} from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ScheduleDetailType} from "../../../model/CalendarApiModel";
import {getYmdDay, getYmdToDate} from "../../../services/formattingDay";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store/store";
import {BiTrash} from "react-icons/bi";
import {ko} from "date-fns/locale";
import Slider from "react-slick";
import {IoCheckmarkOutline} from "react-icons/io5";

interface ScheduleAddComponentType {
    insertFunction:(param:ScheduleDetailType)=>void;
    deleteFunction:()=>void;
    data?:ScheduleDetailType|null;
}

const ScheduleAddComponent = ({insertFunction,deleteFunction,data}:ScheduleAddComponentType) => {

    const [titleValue,setTitleValue] = useState<string>(data ? data.title : "");
    const changeTitleHandle=(e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setTitleValue( (e.target.value).replaceAll("<br>", "\r\n") );
    }

    const [currentColor , setCurrentColor] = useState<string>(data ? data.color : "skyblue");

    const selectedDay = useSelector((state: RootState) => state.calendar.selectedDay);
    console.log(`selectedDay  :  ${selectedDay}`);
    const [startDate, setStartDate] = useState<Date>(data ? getYmdToDate(data.startDate) : selectedDay);
    const [endDate, setEndDate] = useState<Date>(data ? getYmdToDate(data.endDate) : selectedDay);


    const [warningText, setWarningText] = useState<string>("");


    // 수정 및 등록 버튼
    const handleUpsertBtn =()=>{
        let param:ScheduleDetailType ={scheduleSn:data?.scheduleSn,startDate:getYmdDay(startDate),endDate:getYmdDay(endDate),title:titleValue,color:currentColor};
        if(checkNewSchedule(param)) {
            insertFunction(param);
        }
    };

    // 작성한 일정 체크
    const checkNewSchedule=(param:ScheduleDetailType)=>{
        let {title ,startDate , endDate} = param;
        if(title.length === 0) {
            setWarningText("제목을 입력 하셔야 합니다")
            return false;
        }
        setWarningText("")
        return true;
    }



    return (
        <ScheduleAddWrap>

            <ScheduleTitleTextArea spellCheck="false"  onChange={changeTitleHandle} value={titleValue} maxLength={2000} placeholder='제목 입력'/>
            <WarningTextWrap>{warningText}</WarningTextWrap>

            <ColorBoxWrap>
                <ColorBox color={currentColor} />
                <CheckColor/>
            </ColorBoxWrap>

            <ColorBoxWrap>
                {["red","Orange","green","blue","skyblue","purple"].map((color)=> (
                    <ColorBox onClick={()=> setCurrentColor(color)} key={color} color={color} />
                ))}
            </ColorBoxWrap>
            
            <ScheduleDateWrap>
                <label htmlFor="startDate">시작</label>
                <MyDatePicker
                    id="startDate"
                    name={"startDate"}
                    locale={ko}
                    selected={startDate}
                    maxDate={endDate}
                    onChange={(date:Date) => setStartDate(date)}
                    dateFormat="MM월dd일"
                    placeholderText="시작일자"
                    closeOnScroll={true}
                />
                <label htmlFor="endDate">종료</label>
                <MyDatePicker
                    id="endDate"
                    locale={ko}
                    selected={endDate}
                    minDate={startDate}
                    onChange={(date:Date) => setEndDate(date)}
                    dateFormat="MM월dd일"
                    placeholderText="종료일자"
                    closeOnScroll={true}
                />
            </ScheduleDateWrap>
            <ScheduleButtonWrap>
                {data && <ScheduleButton> <BiTrash  style={{marginRight : "3px"}} onClick={()=> deleteFunction()} /></ScheduleButton>}
                <ScheduleButton onClick={()=>handleUpsertBtn()}><IoCheckmarkOutline /></ScheduleButton>
            </ScheduleButtonWrap>

            <Slider
                touchMove={false}
                dots={false}
                infinite={true}
                speed={1000} // Time in milliseconds between each slide change
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={5000} // Time in milliseconds to wait before moving to the next slide
                fade={true}
            >
                <SliderItem>NowNowjj</SliderItem>
                <SliderItem>Calendar App</SliderItem>
                <SliderItem>My Record</SliderItem>
            </Slider>


            {/*<CalendarHeaderBannerComponent/>*/}
        </ScheduleAddWrap>
    );
};
const ScheduleButtonWrap = styled.div`
  text-align: right;
`
const ScheduleButton= styled.button`
  border: none;
  width: 50px;
  height: 30px;
  margin-left: 10px;
  border-radius: 5px;
  font-size: 16px;
`

const SliderItem = styled.div`
    border: 1px solid;
    border-radius: 10px;
    height: 80px;
    
`

const WarningTextWrap = styled.div`
  margin: 5px 0px;
  line-height: 15px;
`

const ScheduleAddWrap = styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 800px;
`

const ScheduleDateWrap = styled.div`
    display: flex;
    align-items: center;
    resize: none;
    margin: 10px 0;
    gap: 5px;
`

export const ScheduleTitleTextArea = styled.textarea`
    width: 100%;
    border-radius: 5px;
    background-color: #fff7f7;
    outline: none;
    padding: 2px 1px;
    resize: none;
    font-size: 16px;
    border-collapse: collapse;
    border:1px solid lightgray;
`


export const CheckColor = styled(IoMdCheckmark)`
  position: absolute;
  z-index: 1;
  top: 1px;
  left: 1px;
  width: 17px;
  height: 17px;
  color: white;
`

const ColorBoxWrap= styled.div`
    display: flex;
    align-items: center;
    gap:10px;
    position: relative;
    
`
const MyDatePicker = styled(DatePicker)`
  border-radius: 4px;
  //border: 2px solid #e8e8e8;
  //padding: 10px 10px 10px 10px;
  background-color: white;
  margin: 2px;
  outline:none;
  width:65px;
  border: none;
  font-size: 16px;
`

export default ScheduleAddComponent;