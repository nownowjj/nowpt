import {route} from "./remocon";
import {useNavigate} from 'react-router-dom';
import React from "react";

/**
 *
 * @param navigate
 * @param error
 * 공통으로 사용할 Api error handleComponent
 */

export interface ApiErrorHandleInterface {
    code:string;
    msg:string;
    data:string;
}

const ApiErrorHandle: React.FC<ApiErrorHandleInterface>  = ({ code, msg, data }) => {
    console.log(`code ${code}, msg ${msg} , data ${data}`);
    const navigate  = useNavigate();
    if (code === '4444') navigate(route.login);
    else if(code === '4445'){
        console.log();
        console.log('서버 상태 X');
        // navigate(route.login);
    }
    else {
        console.log('4444 아님');
        console.log();
    }

    return null;
};
export default ApiErrorHandle;