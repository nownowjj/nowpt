import React from 'react';
import styled from "styled-components";
import {BiTrash} from "react-icons/bi";
import {PiWrenchFill} from "react-icons/pi";
import dayjs from "dayjs";
import 'dayjs/locale/ko'; // 해당 로케일을 import해야 오후/오전 표시가 가능합니다
dayjs.locale('ko'); // 로케일을 설정합니다 (한국어 기준)

const CalendarDetailContentWrap = ({ data, navigate, removeRecord , recordDate }) => {
    console.log("gㅇ욤");

    return (
        <DetailContentWrap key={data.calendarSn}>
            <div className="detailTitle">{data.title}</div>
            <DetailContent className="detailContent">{data.content}</DetailContent>
            <DetailTimeAndFixDelete>
                <PiWrenchFill
                    onClick={() =>
                        navigate('/calendarRecordNewOrFix', {
                            state: {
                                "recordDate" : recordDate,
                                "sn": data.calendarSn,
                                "content": data.content,
                                "title": data.title,
                            },
                        })
                    }
                >
                </PiWrenchFill>
                <BiTrash onClick={() => removeRecord(data.calendarSn)} />
                <span className="detailRegistDt">{(dayjs(data.frstRegistDt).format('A HH:mm:ss'))}</span>
            </DetailTimeAndFixDelete>
        </DetailContentWrap>
    )
}

const DetailContentWrap = styled.div`
    width:100%;
    height:120px;
    padding:10px;
    border-bottom:1px solid #e8e8e8;
`

const DetailContent = styled.div`
    height: 65px; 
    overflow: auto;
    font-size: 15px;
`

const DetailTimeAndFixDelete = styled.span`
    border:1px solid black;
    text-align:right;
`


export default CalendarDetailContentWrap;