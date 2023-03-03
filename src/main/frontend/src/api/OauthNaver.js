import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {ACCESS_TOKEN, naverLogin} from "./Api";

const OauthNaver = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');
    const state = new URL(window.location.href).searchParams.get('state');


    useEffect(() => {
        // (async () => {
        //     try {
        //         await
        naverLogin(code,state)
            .then(response => {

                console.log("네이버 성공 !!")
                console.log(response.token.accessToken);
                sessionStorage.setItem(ACCESS_TOKEN, response.token.accessToken);

                console.log('로그인에 성공하였습니다!');
                navigate("/go/common/mypage");

            })
            .catch(error => {
                alert("네이버 로그인 실패");
                console.log(error);
                navigate('/go/main');
            })

    },[]);

    return (
        <div>
        </div>
    )
}

export default OauthNaver