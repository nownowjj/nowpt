import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {logoutAction} from "../redux/slice/userSlice";
import AlertComponent from "../pages/calendar/component/AlertComponent";
import {useNavigate} from "react-router-dom";
import {route} from "../services/remocon";

const IsExpiredComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [closeCallBackFn , setCloseCallBackFn] = useState<()=>void>();
    
    const alertFunction =(closeCallBack: ()=> void , message:string)=>{
        setCloseCallBackFn(() => closeCallBack)
        setMessageCall(message);
        setShowAlert(true);
    }


    useEffect(() => {
        dispatch(logoutAction());
        alertFunction(()=> setShowAlert(false),'로그인 정보가 만료 되었습니다<br/>로그인 페이지로 이동합니다')
    }, []);

    
    return (
        <>
            {/* AlertComponent */}
            {showAlert &&(
                <AlertComponent
                    message= {messageCall}
                    onClose={()=> {
                        closeCallBackFn && closeCallBackFn();
                        setShowAlert(false);
                        navigate(route.login, { replace: true });
                    }}
                />
            )}
            {/* AlertComponent */}
        </>
    );
};

export default IsExpiredComponent;