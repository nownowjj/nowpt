import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {ACCESS_TOKEN, kakaoLogin} from "./Api";
import HomeComponent from "../pages/HomeComponent";
import HeaderComponent from "../component/HeaderComponent";

const Oauth = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');

    // const [oauth, setOauth] = useState("");
    // console.log("code" + code);
    // console.log("OAuth")

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
                navigate("/api/common/mypage");

            })
            .catch(error => {
                alert("카카오 로그인 실패");
                console.log(error);
                navigate('/api/main');
            })

        //
        // const res = await axios.get(`http://localhost:8060/oauth/kakao?code=${code}`);
        // console.log("res"+ JSON.stringify(res))
        // const token = res.headers.authorization;
        // console.log("token"+ token)
        // window.localStorage.setItem('token', token);
        // navigate('/api/calculator');
        //     } catch (e) {
        //         alert("catch error")
        //         console.error(e);
        //         navigate('/api/main');
        //     }
        // })();
    },[]);

    return (
        <div>
            {/*{*/}
            {/*    oauth &&(*/}
            {/*        <HeaderComponent oauth={oauth}/>*/}
            {/*    )*/}
            {/*}*/}

            {/*{*/}
            {/*    oauth !== "undefined" && "" && undefined*/}
            {/*    ?*/}
            {/*        <HeaderComponent oauth={oauth}/>*/}
            {/*        :*/}
            {/*        <HeaderComponent oauth={"dldldl"}/>*/}
            {/*}*/}
        </div>
    )
}

export default Oauth