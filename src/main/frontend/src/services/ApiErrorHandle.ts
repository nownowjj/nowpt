import {route} from "./remocon";
import {useNavigate} from 'react-router-dom';
import React from "react";

/**
 *
 * @param navigate
 * @param error
 * 공통으로 사용할 Api error handleComponent
 */

interface ApiErrorHandleInterface {
    code:string;
    msg:string;
    data:string;
}

const ApiErrorHandle = (error:ApiErrorHandleInterface) => {
    const navigate = useNavigate();

    console.log("error 발생 !! ApiErrorHandle 진입 %O",error);
    if (error.code === '4444') navigate(route.login);
    else {
        console.log('4444 아님');
        console.log(error);
    }
};
export default ApiErrorHandle;