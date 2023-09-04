import React, {useState} from 'react';
import styled from "styled-components";
import MyPageSmListToggleIconComponent from "./MyPageSmListToggleIconComponent";
import CountUp from "react-countup";
import {CalendarRecordSm} from "../../../model/CalendarApiModel";

interface MyPageRecordSmComponentInterface {
    recordList:CalendarRecordSm[];
}

interface YearData {
    year: string;
    data: {
        month: string;
        monthCount: number;
    }[];
    monthCountSum: number;
}

interface YearGroupedData {
    [year: string]: YearData;
}

const MyPageRecordSmComponent :React.FC<MyPageRecordSmComponentInterface> = ({recordList}) => {
    const  yearGrouped:YearGroupedData = {};
    recordList.length >0 &&recordList.forEach((item)=>{
        const { year, month, monthCount }:CalendarRecordSm = item;
        if (!yearGrouped[year]) {
            yearGrouped[year] = {
                year: year,
                data: [] ,
                monthCountSum:0
            };
        }
        yearGrouped[year].monthCountSum += parseInt(monthCount.toString());
        yearGrouped[year].data.push({ month, monthCount });
    })
    console.log(yearGrouped);


    // const [visibility, setVisibility] = useState({});
    const [visibility, setVisibility] = useState<{ [key: number]: boolean }>({});



    const handleToggle = (itemId:number) => {
        setVisibility((prevVisibility) => ({
            ...prevVisibility,
            [itemId]: !prevVisibility[itemId],
        }));
    };

    return (
        <MyRecordSmComponentWrap>
            {
                recordList.length > 0
                    ?
                Object.values(yearGrouped).map((item,index) => (

                    <MyRecordSmItemWrap key={index}  style={{ borderBottom: index === Object.values(yearGrouped).length - 1 ? 'none' : '1px solid #e8e8e8' }}>
                        <MyRecordSmItemTop>
                            <div>{item.year}년</div>
                            <div>
                                <CountUp end={item.monthCountSum} duration={0.7}/>건
                                <MyPageSmListToggleIconComponent itemId={index} onToggle={handleToggle} />
                            </div>
                        </MyRecordSmItemTop>
                        <MyRecordSmListWrap style={{ display: visibility[index] ? 'block' : 'none' }}>
                            {item.data.map((monthData) => (
                                <MyRecordSmList key={monthData.month}>
                                    <div>{Number(monthData.month)}월</div>
                                    <div>{monthData.monthCount}건</div>
                                </MyRecordSmList>
                            ))}
                        </MyRecordSmListWrap>
                    </MyRecordSmItemWrap>

                )):
                    <MyRecordSmItemWrap>
                        <MyRecordSmItemTop>
                            <div>기록이 없습니다</div>
                            <div>
                                <CountUp end={0} duration={0.7}/>건
                            </div>
                        </MyRecordSmItemTop>
                    </MyRecordSmItemWrap>
            }
        </MyRecordSmComponentWrap>
    );
};
const MyRecordSmList =styled.div`
    display:flex;
    padding: 1px 25px;
    align-items: center;
    justify-content: space-between;
`

const MyRecordSmListWrap = styled.ul`
    border-top:1px solid #fdf6f6;
    display:none;
`
const MyRecordSmItemTop = styled.div`
    width:100%;
    display:flex;
    padding: 15px 10px;
    align-items: center;
    justify-content: space-between;
    // border-bottom:1px solid #e8e8e8;
`

const MyRecordSmItemWrap = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    // border-bottom:1px solid #e8e8e8;
`

const MyRecordSmComponentWrap = styled.div`
    width:90%;
    border: 1px solid #e8e8e8;
    border-radius: 15px;
    margin-top: 30px;
`

export default MyPageRecordSmComponent;