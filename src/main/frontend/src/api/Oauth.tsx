import React, {useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom';
import {ACCESS_TOKEN, kakaoLogin, naverLogin} from "./Api";
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/slice/userSlice";
import LoadingComponent from "../pages/LoadingComponent";

const Oauth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');
    const state = new URL(window.location.href).searchParams.get('state');
    
    console.log("state = " + state);

    const performSocialLogin = (loginFunction, successMessage) => {
        loginFunction(code, state)
            .then(response => {
                dispatch(loginAction(response.token.accessToken));
                localStorage.setItem(ACCESS_TOKEN, response.token.accessToken);
                console.log(successMessage);
                navigate("/calendar");
            })
            .catch(error => {
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

    const loginMap = useRef({
        "KAKAO": () => kakaoFn(),
        "NAVER": () => naverFn()
    });

    useEffect(() => {
        loginMap.current[state]();
    }, [state]);


    return (
        <LoadingComponent/>
    )
}

export default Oauth