import React from 'react';
import styled from "styled-components";
import dayjs from "dayjs";



interface DotsComponentInterface {
    date:Date;
    mark:string[];
    schedule ?: string[]; // or specific type if applicable
}

const DotsComponent = (data:DotsComponentInterface) => {
    const colors = ['red', 'blue', 'purple', 'green', 'black', 'black', 'black', 'black', 'black', 'black'];
    const date =dayjs(data.date).format('YYYYMMDD');// 해당 일자

    const mark = data.mark;                                   // 이벤트 일자 ex : ['2023-06-10','2023-06-23','2023..]
    const count = mark.filter(item => item === date).length;  // 해당 일자가 이벤트 일자에 몇개 포함하는지
    const dotsDivs = [];
    for (let index = 0; index < count; index++) {
        dotsDivs.push(<Dot key={index} color={colors[index]} />);
    }

    const schedule = data.schedule;
    const divs = [];

    if (schedule) {
        for (let i = 0; i < schedule.length; i++) {
            if (i < 3) {
                divs.push(<Schedule key={i}>{schedule[i]}</Schedule>);
            } else if (i === 3) {
                divs.push(<Schedule key={i}>...</Schedule>);
                break; // 4번째 요소일 때 반복문 중지
            }
        }
    }


    return (
        <>
            {divs.length >0 && <ScheduleWrap>{divs}</ScheduleWrap>}

            <DotWrap className="dotWrap" >
                {dotsDivs}
           </DotWrap>
        </>
    );
};
const Schedule = styled.div`
    margin-bottom: 1.5px;
    border-radius: 2px;
    color: white ;
    background-color: skyblue;
    height: 14px;
    line-height: 14px;
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const ScheduleWrap = styled.div`
    height: 100%;
    width: 100%;
    margin-top: 14px;
`


const Dot = styled.div<{color:string}>`
    height: 8px;
    width: 8px;
    border-radius: 50%;
    display: flex;
    margin-left: 1px;
    background-color: ${({ color }) => color};
`
const DotWrap = styled.div`
    display: flex;
    bottom: 2px;
    position: absolute;
    flex-wrap: wrap;
    padding-right: 6px;
`
export default DotsComponent;