import React, {useState} from 'react';
import styled from "styled-components";
import {ScheduleDetailType} from "../../../model/CalendarApiModel";
import {getMyDddDay} from "../../../services/formattingDay";
import {ColorBox} from "./DetailSchedule";
import {BiTrash} from "react-icons/bi";


interface ScheduleDetailComponentType {
    data:ScheduleDetailType
    deleteFunction: ()=> void;
}

const ScheduleDetailComponent = ({data , deleteFunction}:ScheduleDetailComponentType) => {
    console.log(data);
    const colorArr = ["red", "Orange" , "yellow" , "green" , "blue"];
    const [currentColor , setCurrentColor] = useState<string>(data.color);


    return (
        <ScheduleDetailWrap>

                <div>{data.title}</div>
                <div>
                    <span>{data.startDate === data.endDate ? getMyDddDay(data.startDate) : `${getMyDddDay(data.startDate)} ~ ${getMyDddDay(data.endDate)}` }</span>
                    <span> <BiTrash  style={{marginRight : "3px"}} onClick={()=> deleteFunction()} /></span>
                </div>

                <ColorBox color={currentColor} />
                <ColorBoxWrap>
                    {colorArr.map((color)=> (
                        <ColorBox onClick={()=> setCurrentColor(color)} key={color} color={color} />
                    ))}
                </ColorBoxWrap>

        </ScheduleDetailWrap>
    );
};

const ScheduleDetailWrap = styled.div`
    border: 1px solid red;
    
`

const ColorBoxWrap= styled.div`
    display: flex;
    align-items: center;
    //justify-content: center;
    gap:10px
    
`

export default ScheduleDetailComponent;