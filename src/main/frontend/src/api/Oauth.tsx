import React, {useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom';
import {ACCESS_TOKEN, kakaoLogin, naverLogin} from "./Api";
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/slice/userSlice";
import LoadingComponent from "../pages/LoadingComponent";

const Oauth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const code:string | null = new URL(window.location.href).searchParams.get('code');
    const state:string | null = new URL(window.location.href).searchParams.get('state');


    const performSocialLogin = (loginFunction:Function, successMessage:string) => {
        loginFunction(code, state)
            .then((response:any) => {
                dispatch(loginAction(response.token.accessToken));
                localStorage.setItem(ACCESS_TOKEN, response.token.accessToken);
                console.log(successMessage);
                navigate("/calendar");
            })
            .catch((error:any) => {
                alert("로그인 실패");
                console.log(error);
                navigate('/go/login');
            });
    };

    const kakaoFn = () => {
        performSocialLogin(kakaoLogin, '카카오 소셜 로그인에 성공하였습니다!');
    };

    const naverFn = () => {
        performSocialLogin(naverLogin, '네이버 소셜 로그인에 성공하였습니다!');
    };

    interface LoginMap {
        [key: string]: () => void;
    }

    const loginMap: LoginMap = {
        KAKAO: kakaoFn,
        NAVER: naverFn,
    };

    useEffect(() => {
        if (state) {loginMap[state]();}
    }, [state]);


    return (
        <LoadingComponent/>
    )
}

export default Oauth