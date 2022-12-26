import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {kakaoLogin} from "./Api";
import HomeComponent from "../pages/HomeComponent";
import HeaderComponent from "../component/HeaderComponent";

const Oauth = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');

    const [oauth, setOauth] = useState("");
    // console.log("code" + code);
    // console.log("OAuth")

    useEffect(() => {
        // (async () => {
        //     try {
        //         await
        kakaoLogin(code)
            .then(response => {
                let data = response.datas.id;
                // setOauth(response.datas);
                setOauth(data);
                console.log("1 !!")
                console.log(response.datas.id);
                if (response.datas.id) {
                    console.log("response에 id가 존재함")
                    // setTimeout(() => {
                        console.log("2!! setTimeOut!!")
                        navigate('/')
                    // }, 0.5)
                }

            })
            .catch(error => {
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
    },[oauth]);

    return (
        <div>
            {/*{*/}
            {/*    oauth &&(*/}
            {/*        <HeaderComponent oauth={oauth}/>*/}
            {/*    )*/}
            {/*}*/}

            {
                oauth !== "undefined" && "" && undefined
                ?
                    <HeaderComponent oauth={oauth}/>
                    :
                    <HeaderComponent oauth={"dldldl"}/>
            }
        </div>
    )
}

export default Oauth