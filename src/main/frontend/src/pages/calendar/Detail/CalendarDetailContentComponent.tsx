import React, {useState} from 'react';
import styled from "styled-components";
import {BiTrash} from "react-icons/bi";
import {PiWrenchFill} from "react-icons/pi";
import 'dayjs/locale/ko';
import {importRecord} from "../../../api/CalendarApi";
import DetailStarSubComponent from "./DetailStarSubComponent";
import {route} from "../../../services/remocon";
import {useNavigate} from "react-router-dom";
import {CalendarDto} from "../../../model/CalendarApiModel";
import CommentIconComponent from "../Comment/CommentIconComponent";
import {useConfirm} from "../../../hooks/useConfirm";
import {getData} from "../../../api/Api";
import {getFormatDay} from "../../../services/formattingDay";


/**
 *
 * @param data
 * @param navigate
 * @param removeRecord
 * @param importPage 여부로 일반적인 디테일 페이지인지 , 중요 페이지에서 진입한건지 구분
 * @param importEvent
 */

interface CalendarDetailContentComponentProps{
    data: CalendarDto;
    removeRecord?: (calendarSn: number) => void; // Update the prop type here
    importPage: boolean;
    importEvent?: (calendarSn: number, newImportYn: boolean) => void; // Update this type too if needed
    friendPage?:boolean;
}
const CalendarDetailContentComponent:React.FC<CalendarDetailContentComponentProps> = ({ data, removeRecord,importPage ,importEvent , friendPage }) => {
    const navigate = useNavigate();
    const [initialYn, setInitialYn] = useState<boolean>(data.importYn);

    const { confirmFunction } = useConfirm();

    const importantRecord =async (bool:boolean)=> {

        let param = {
            calendarSn: data.calendarSn,
            importYn: bool
        };
        const result = await getData(importRecord , param)
        setInitialYn(result.importYn)
    };

    const handleDelete = () => {
        if (removeRecord) removeRecord(data.calendarSn);
    };

    console.log(data);
    return (
        <DetailContentWrap key={data.calendarSn}>
            <DetailTitle>{data.title}</DetailTitle>
            <DetailContent>
                {data.content}
            </DetailContent>

            {data.imageUrl ? <DetailImg src={data.imageUrl} /> : ''}

            <DetailTimeAndFixDelete>
                <span style={{marginRight : "5px"}}>{getFormatDay(data.frstRegistDt ,'YYYY.MM.DD HH:mm')}</span>
                {
                    !friendPage  &&     // 친구가 보러왔을땐  중요,수정,삭제 보여주지 않음
                <>
                    {/* 중요 */}
                    <DetailStarSubComponent
                        initialYn={initialYn}
                        importantRecord={importantRecord}
                        style={{color:"black",fontSize:"19px"}}
                    />
                    {/* 수정 */}
                    <PiWrenchFill style={{marginRight : "2px"}}
                        onClick={() =>
                            navigate(route.calendarRecordNewOrFix, {
                                state: {
                                    "recordDate" : data.recordDate,
                                    "sn": data.calendarSn,
                                    "content": data.content,
                                    "title": data.title,
                                    "importYn": data.importYn,
                                },
                            })
                        }
                    >
                    </PiWrenchFill>
                    <BiTrash  style={{marginRight : "3px"}} onClick={()=> confirmFunction(handleDelete ,`기록을 삭제합니다` )} /> {/* 삭제 */}
                </>
                }
                <CommentIconComponent
                    data={data}
                />
            </DetailTimeAndFixDelete>
        </DetailContentWrap>
    )
}
const DetailImg = styled.img`
  width : 100px;
  height: 100px;
  border : 1px solid #e8e8e8;
  border-radius: 10px;
  object-fit: cover;
`

export const DetailContentWrap = styled.div`
    width:100%;
    padding:10px;
    border-bottom:1px solid #e8e8e8;
`
export const DetailTitle = styled.div`
    text-align: left;
`
export const DetailContent = styled.div`
    height: fit-content; 
    //height: 65px; 
    overflow: auto;
    font-size: 13px;
    white-space: break-spaces;
`

export const DetailTimeAndFixDelete = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
`


export default CalendarDetailContentComponent;