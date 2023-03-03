import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {ACCESS_TOKEN, kakaoLogin} from "./Api";
import HomeComponent from "../pages/HomeComponent";
import HeaderComponent from "../component/HeaderComponent";

const Oauth = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        // (async () => {
        //     try {
        //         await
        kakaoLogin(code)
            .then(response => {

                console.log("1 !!")
                console.log(response.token.accessToken);
                sessionStorage.setItem(ACCESS_TOKEN, response.token.accessToken);

                console.log('로그인에 성공하였습니다!');
                navigate("/go/common/mypage");

            })
            .catch(error => {
                alert("카카오 로그인 실패");
                console.log(error);
                navigate('/go/main');
            })

    },[]);

    return (
        <div>
        </div>
    )
}

export default Oauth