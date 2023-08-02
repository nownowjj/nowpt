import React, {useState} from 'react';
import dayjs from "dayjs";
import ConfirmComponent from "../component/ConfirmComponent";
import styled from "styled-components";

const NotificationComponent = ({data,updateNoti,deleteAllNoti}) => {


    // Alert 여부
    const [showAlert , setShowAlert] = useState(false);
    const [okCallBackFn, setOkCallBackFn] = useState(null);
    const [messageCall, setMessageCall] = useState('');

    const confirmFunction =(okCallBack , message)=>{
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }

    // 단건 삭제 callback
    const updateHandle=()=> updateNoti(data.notificationSn);
    // 일괄 삭제 callback
    const deleteHandle=()=> deleteAllNoti();

    return (
        <DetailContentWrap key={data.calendarSn}>
            <div className="detailTitle">{data.notificationTitle}</div>
            <DetailContent className="detailContent">{data.notificationContent}</DetailContent>

            <DetailTimeAndFixDelete>
                <span style={{marginRight : "5px"}}  className="detailRegistDt">
                            {dayjs(data.frstRegistDt).format('YYYY-MM-DD A HH:mm:ss')}
                    <span  onClick={()=> confirmFunction(updateHandle ,`정말<br/> 삭제 하시겠습니까?` )}>안봐</span>
                    <span onClick={()=> confirmFunction(deleteHandle ,`정말<br/> 삭제 ?` )}>싹다!@</span>
                </span>
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
    );
};

const DetailContentWrap = styled.div`
    width:100%;
    height:120px;
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

export default NotificationComponent;