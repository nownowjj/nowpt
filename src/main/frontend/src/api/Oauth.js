import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {ACCESS_TOKEN, kakaoLogin, naverLogin} from "./Api";
import {KAKAO_STATE, NAVER_STATE} from "./OauthLoginUrl";
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/slice/userSlice";

const Oauth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');
    const state = new URL(window.location.href).searchParams.get('state');
    
    console.log("state = " + state);

    useEffect(() => {
        if(state === KAKAO_STATE){
            kakaoLogin(code)
                .then(response => {
                    dispatch(loginAction(response.token.accessToken));
                    sessionStorage.setItem(ACCESS_TOKEN, response.token.accessToken);
                    console.log('카카오 소셜 로그인에 성공하였습니다!');
                    navigate("/go/main");
                })
                .catch(error => {
                    alert("카카오 로그인 실패");
                    console.log(error);
                    navigate('/go/main');
                })
        }else if(state === NAVER_STATE){
            naverLogin(code,state)
                .then(response => {
                    dispatch(loginAction(response.token.accessToken));
                    sessionStorage.setItem(ACCESS_TOKEN, response.token.accessToken);
                    console.log('네이버 소셜 로그인에 성공하였습니다!');
                    navigate("/go/main");
                })
                .catch(error => {
                    alert("네이버 로그인 실패");
                    console.log(error);
                    navigate('/go/main');
                })
        }
    },[]);

    return (
        <div>
        </div>
    )
}

export default Oauth