import React, {useState} from 'react';
import dayjs from "dayjs";
import ConfirmComponent from "../component/ConfirmComponent";
import styled from "styled-components";
import {NotificationDto} from "../../../model/NotificationApiModel";

interface NotificationComponentInterface {
    data:NotificationDto;
    updateNoti:(notificationSn:number)=> void;
    deleteAllNoti:()=>void;

}

const NotificationComponent:React.FC<NotificationComponentInterface> = ({data,updateNoti,deleteAllNoti}) => {
    console.log(data);


    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [okCallBackFn, setOkCallBackFn] = useState<()=>void>();

    const confirmFunction = (okCallBack: () => void,  message:string)=>{
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }

    // 단건 삭제 callback
    const updateHandle=()=> updateNoti(data.notificationSn);
    // 일괄 삭제 callback
    const deleteHandle=()=> deleteAllNoti();

    return (
        <DetailContentWrap key={data.notificationSn}>
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
    // height:120px;
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