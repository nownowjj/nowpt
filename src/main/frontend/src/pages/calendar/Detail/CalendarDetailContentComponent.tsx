import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import {BiTrash} from "react-icons/bi";
import {PiWrenchFill} from "react-icons/pi";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import {importRecord} from "../../../api/CalendarApi";
import DetailStarSubComponent from "./DetailStarSubComponent";
import {route} from "../../../services/remocon";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import ConfirmComponent from "../component/ConfirmComponent";
import {useNavigate} from "react-router-dom";
import {CalendarDto} from "../../../model/CalendarApiModel"; // 해당 로케일을 import해야 오후/오전 표시가 가능합니다
dayjs.locale('ko'); // 로케일을 설정합니다 (한국어 기준)

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
    removeRecord: (calendarSn: number) => void; // Update the prop type here
    importPage: boolean;
    importEvent: (calendarSn: number, newImportYn: boolean) => void; // Update this type too if needed
    friendPage?:boolean;
}
const CalendarDetailContentComponent:React.FC<CalendarDetailContentComponentProps> = ({ data, removeRecord,importPage ,importEvent , friendPage }) => {
    const navigate = useNavigate();
    const [initialYn, setInitialYn] = useState<boolean>(data.importYn);
    // 즐겨찾기를 등록 할 떄에는 바로 등록
    // 취소시에는 동의를 받고 취소 시킴. confirm 사용
    const [isProcessing, setIsProcessing] = useState(false); // 상태 추가: 요청 처리 중 여부


    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();

    const confirmFunction = (okCallBack: () => void,  message:string)=>{
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }

    const importantRecord =useCallback(
        (boolean)=>{
        if (isProcessing) return; // 이미 요청 처리 중이면 함수 실행 중단
        setIsProcessing(true); // 요청 처리 시작

        let param = {
            calendarSn: data.calendarSn,
            importYn  : boolean
        };
        importRecord(param)
            .then(response=>{
                setInitialYn(response.data.importYn);
                importEvent(data.calendarSn,param.importYn)
            })
            .catch(error=>{
                console.log(error);
                ApiErrorHandle(error);
            }).finally(()=>{
            setIsProcessing(false);
            })
        },[isProcessing]
    );

    const handleDelete = () => {
        removeRecord(data.calendarSn);
    };

    return (
        <DetailContentWrap key={data.calendarSn}>
            <div className="detailTitle">{data.title}</div>
            <DetailContent className="detailContent">{data.content}</DetailContent>

            <DetailTimeAndFixDelete>

                <span style={{marginRight : "5px"}}  className="detailRegistDt">
                    {
                        importPage
                        ?
                            (dayjs(data.frstRegistDt).format('YYYY-MM-DD A HH:mm:ss'))
                            :
                            (dayjs(data.frstRegistDt).format('A HH:mm:ss'))
                    }
                </span>
                {
                    !friendPage  &&     // 친구가 보러왔을땐  중요,수정,삭제 보여주지 않음
                <>
                    <DetailStarSubComponent
                        initialYn={initialYn} // 하위 컴포넌트로 상태 전달
                        importantRecord={importantRecord}
                        style={{color:"black",fontSize:"19px"}}
                    />
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
                    <BiTrash onClick={()=> confirmFunction(handleDelete ,`정말<br/> 삭제 하시겠습니까?` )} />
                </>
                }
            </DetailTimeAndFixDelete>

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


        </DetailContentWrap>
    )
}


const DetailContentWrap = styled.div`
    width:100%;
    height:125px;
    padding:10px;
    border-bottom:1px solid #e8e8e8;
`

const DetailContent = styled.div`
    height: 65px; 
    overflow: auto;
    font-size: 13px;
    white-space: break-spaces;
`

const DetailTimeAndFixDelete = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
`


export default CalendarDetailContentComponent;