import React, {useState} from 'react';
import styled from "styled-components";
import {insertRecord} from "../../../api/CalendarApi";
import {useLocation, useNavigate} from 'react-router-dom'
import moment from "moment";
import validateRecordInsertOrUpdate from "../../../services/validate";
import ApiErrorHandle from "../../../services/ApiErrorHandle";
import AlertComponent from "../component/AlertComponent";
import DetailStarSubComponent from "./DetailStarSubComponent";

interface FixParam {
    titleValue: string; // Assuming titleValue is of type string
    contentValue: string; // Assuming contentValue is of type string
}

interface NewReCordParam {
    recordDate:string;
    calendarSn?:number;
    title:string;
    content:string;
    importYn:boolean;
}

const CalendarRecordNewOrFixPage = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const isFix = !!state.sn;   // 해당 페이지 접근은 (수정,신규등록) 두가지의 경로가 있음 그걸 sn의 유무로 판별한다. sn이 존재하면 true 없으면 false

    const initialTitle = isFix ? state.title : "";       // Title ,Content가 존재한다면 input value를 지정해놓는다.
    const initialContent = isFix ? state.content : "";
    const initialImportYn = isFix ? state.importYn : false;

    const [titleValue , setTitleValue] = useState<string>(initialTitle);
    const [contentValue , setContentValue] = useState<string>(initialContent);
    const [importYn , setImportYn]  = useState<boolean>(initialImportYn);

    const {recordDate} = state;
    // 수정 모드 경우에는 validate 추가
    const fixParam: FixParam = {titleValue:'',contentValue:''}; // Define fixParam with the FixParam type
    if(isFix){
        fixParam.titleValue = initialTitle;
        fixParam.contentValue = initialContent;
    }


    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [closeCallBackFn , setCloseCallBackFn] = useState<()=>void>();


    /**
     * @param closeCallBack,message
     * @param message
     * @guide "확인" 버튼의 onClick callback을 넣어준다 단순히 노티만 할거면 closeCallBack을 null로 주고 추가 callback이 필요 하다면  callback Funciton을 넘겨준다
     * @return <AlertComponent>
     */
    const alertFunction =(closeCallBack: ()=> void , message:string)=>{
        setCloseCallBackFn(() => closeCallBack)
        setMessageCall(message);
        setShowAlert(true);
    }


    // 등록 및 수정이 성공 하였을 때 사용할 callback
    const newOrFixRecordSuccess =()=> navigate(-1);

    // api 요청 시에 사용할 param
    const param: NewReCordParam = {
        recordDate: recordDate,
        calendarSn: state.sn && state.sn ,
        title: titleValue,
        content: contentValue,
        importYn: false,
    };

    const newRecordEvent=()=>{

        // api 요청전에 validate 실행 true가 아니라면 return 받은 message를 alert에 띄워줌 callback은 필요하지 않다.
        const validationResult = validateRecordInsertOrUpdate(param , fixParam);
        if (validationResult !== true) {
            alertFunction(()=>{} , validationResult);
            return;
        }

        insertRecord(param)  /*param sn의 존재 유무로 Update , Insert 구분*/
            .then(response =>{
                alertFunction(newOrFixRecordSuccess,response.message);
            }).catch(error =>{
                alertFunction(()=>{},'에러 발생')
                ApiErrorHandle(error);
        })
    }


    const changeTitleHandle=(e: React.ChangeEvent<HTMLInputElement>)=>setTitleValue(e.target.value);
    const changeContentHandle=(e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setContentValue( (e.target.value).replaceAll("<br>", "\r\n") );
    }
    const importantRecordEvent =()=> {
        setImportYn(prevState => !prevState);
    }
    return (
        <CalendarWrap>
            <CalendarRecordNewOrFixWrap>
                {/* back button*/}
                <CalendarBack>
                    <span onClick={()=> navigate(-1) }>◀</span>
                    <span style={{color:"black"}}>{moment(recordDate).format('YYYY-MM-DD')}</span>
                </CalendarBack>


                {/* record Wrap*/}
                <CalendarRecordAddArea>
                    <RecordTitleInput type="text" onChange={changeTitleHandle} value={titleValue} maxLength={100} placeholder='제목입력'/>
                    <RecordContentTextArea  onChange={changeContentHandle} value={contentValue} maxLength={2000} placeholder='내용입력'/>

                    <DetailStarSubComponent
                        initialYn={importYn} // 하위 컴포넌트로 상태 전달
                        importantRecord={importantRecordEvent}
                        style={{color:"skyblue",fontSize:"20px",position:"absolute",bottom:"27px",right:"136px",border:"2px solid skyblue",borderRadius:"5px",width:"40px",height:"35px",padding:"2px"}}
                    />
                    <RecordButton onClick={newRecordEvent}>{isFix ? '수정' : '등록'}</RecordButton>
                </CalendarRecordAddArea>


                {/* AlertComponent */}
                {showAlert &&(
                    <AlertComponent
                        message= {messageCall}
                        onClose={()=> {
                            closeCallBackFn && closeCallBackFn();
                            setShowAlert(false);
                        }}
                    />
                )}
                {/* AlertComponent */}
            </CalendarRecordNewOrFixWrap>
        </CalendarWrap>
    );
};
const CalendarWrap = styled.div`
    width:100%;
    height:100%;
`

const RecordTitleInput = styled.input`
    width:100%;
    border:none;
    outline:none;
    padding: 10px 1px;
    font-size: 18px;
      &:focus {
        border-bottom:2px solid skyblue;
    }
`
const RecordContentTextArea = styled.textarea`
    width: 100%;
    border: none;
    border-radius: 5px;
    height: 100%;
    outline: none;
    padding: 2px 1px;
    resize: none;
      &:focus {
        border:2px solid skyblue;
    }
`
const CalendarRecordNewOrFixWrap = styled.div`
    width:100%;
    height:100%;
    padding:20px 15px;
    
`
const CalendarBack = styled.div`
    height: 8%;
    font-size: 25px;
    display: flex;
    color: skyblue;
    justify-content: space-between;
`
const CalendarRecordAddArea = styled.div`
    height:92%;
    border: 2px solid skyblue;
    border-radius: 5px;
    display:flex;
    flex-direction:column;
    align-items: center;
    padding: 0 10px 45px;
`
const RecordButton = styled.button`
    width: 100px;
    height: 35px;
    border:1px solid skyblue;
    background:skyblue;
    color:white;
    border-radius: 5px;
    position: absolute;
    bottom: 27px;
    right: 27px;
`
export default CalendarRecordNewOrFixPage;