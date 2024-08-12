import React, {useState} from 'react';
import styled from "styled-components";
import {insertRecord} from "../../../api/CalendarApi";
import {useLocation, useNavigate} from 'react-router-dom'
import validateRecordInsertOrUpdate from "../../../services/validate";
import DetailStarSubComponent from "./DetailStarSubComponent";
import {FixParam, NewRecordParam} from "../../../model/CalendarApiModel";
import {useQueryClient} from "react-query";
import {getY_m_dDay} from "../../../services/formattingDay";
import CalendarLayout from "../Layout/CalendarLayout";
import {FlexBox, InnerWrap} from "../component/StyledComponent";
import BottomButtonComponent from "../component/BottomButtonComponent";
import {useConfirm} from "../../../hooks/useConfirm";

const CalendarRecordNewOrFixPage = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const isFix = !!state.sn;   // 해당 페이지 접근은 (수정,신규등록) 두가지의 경로가 있음 그걸 sn의 유무로 판별한다. sn이 존재하면 true 없으면 false

    const initialTitle = isFix ? state.title : "";       // Title ,Content가 존재한다면 input value를 지정해놓는다.
    const initialContent = isFix ? state.content : "";
    const initialImportYn = isFix ? state.importYn : false;

    const [titleValue, setTitleValue] = useState<string>(initialTitle);
    const [contentValue, setContentValue] = useState<string>(initialContent);
    const [importYn, setImportYn] = useState<boolean>(initialImportYn);

    const {recordDate} = state;
    // 수정 모드 경우에는 validate 추가
    const fixParam: FixParam = {titleValue: '', contentValue: ''}; // Define fixParam with the FixParam type
    if (isFix) {
        fixParam.titleValue = initialTitle;
        fixParam.contentValue = initialContent;
    }

    const { confirmFunction} = useConfirm();
    const queryClient = useQueryClient();

    // api 요청 시에 사용할 param
    const param: NewRecordParam = {
        recordDate: recordDate,
        calendarSn: state.sn && state.sn,
        title: titleValue,
        content: contentValue,
        importYn: importYn,
    };

    const newRecordEvent = () => {
        // api 요청전에 validate 실행 true가 아니라면 return 받은 message를 alert에 띄워줌 callback은 필요하지 않다.
        const validationResult = validateRecordInsertOrUpdate(param, fixParam);
        if (validationResult !== true) {
            confirmFunction(() => {
            }, validationResult,true);
            return;
        }

        insertRecord(param)  /*param sn의 존재 유무로 Update , Insert 구분*/
            .then(response => {
                confirmFunction(()=>{navigate(-1)}, response.message,true);
                queryClient.invalidateQueries(['myCalendar', recordDate.substring(0, 6)]) // 일정 새로 등록시에 cache 제거
            })
    }

    const changeTitleHandle = (e: React.ChangeEvent<HTMLInputElement>) => setTitleValue(e.target.value);
    const changeContentHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentValue((e.target.value).replaceAll("<br>", "\r\n"));
    }
    const importantRecordEvent = () => {
        setImportYn(prevState => !prevState);
    }
    return (
        <CalendarLayout gnbTitle={getY_m_dDay(recordDate)} useBottom={false}>
            <CalendarWrap>
                <InnerWrap>
                    <FlexBox gap={10}>
                        <RecordTitleInput type="text" onChange={changeTitleHandle} value={titleValue} maxLength={100} placeholder='제목입력'/>
                        <DetailStarSubComponent
                            initialYn={importYn} // 하위 컴포넌트로 상태 전달
                            importantRecord={importantRecordEvent}
                            style={{
                                color: "skyblue",fontSize: "20px",border: "1px solid skyblue",borderRadius: "5px",width: "40px",
                                height: "100%",padding: "2px"
                            }}
                        />
                    </FlexBox>
                    <RecordContentTextArea onChange={changeContentHandle} value={contentValue} maxLength={2000} placeholder='내용입력'/>

                    <BottomButtonComponent clickFunction={newRecordEvent} buttonText={isFix ? '수정' : '등록'}/>

                </InnerWrap>
            </CalendarWrap>
        </CalendarLayout>
    );
};

const CalendarWrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 50px;
`

const RecordTitleInput = styled.input`
  width: 100%;
  outline: none;
  padding: 5px 9px;
  font-size: 18px;
  border: 1px solid skyblue;
  border-radius: 15px;
`
const RecordContentTextArea = styled.textarea`
  width: 100%;
  border-radius: 15px;
  height: 75%;
  outline: none;
  padding: 5px;
  resize: none;
  border: 1px solid skyblue;
  margin-top: 15px;
`

export default CalendarRecordNewOrFixPage;