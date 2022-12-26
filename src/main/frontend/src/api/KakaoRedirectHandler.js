// 리다이렉트될 화면
// KakaoRedirectHandeler.js

import React, { useEffect } from "react";
import axios from 'axios';
import {error} from "bfj/src/events";

const KakaoRedirectHandler = () => {
    useEffect(()=> {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        let grant_type = "authorization_code";
        let client_id = "77cbf4dbfe4487f6bb02d3360642a389";

        axios.get(`https://kauth.kakao.com/oauth/token?
        grant_type=${grant_type}
        &client_id=${client_id}
        &redirect_uri=http://localhost:8060/oauth/kakao
        &code=${code}`
            , {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((res) => {
            console.log(res)
            // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
        }).catch(error =>{
            console.log(error)
        })
    }, [])
};

    // return <div>사실 이페이지는 크게 의미 없다. 첫화면으로 로직이 끝나면 이동시켜주면 된다.</div>;

export default KakaoRedirectHandler;