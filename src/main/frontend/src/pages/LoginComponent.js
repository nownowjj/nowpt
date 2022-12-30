import styled from 'styled-components'
import React, {useState} from 'react'
import {useNavigate} from "react-router";
import Button from "../component/JoinButton";
import {ACCESS_TOKEN, login} from "../api/Api";
import {KAKAO_AUTH_URL} from "../api/KaKaoUrl";
import '../styles/style.css'
import {validateLogin} from "../services/validate";

function LoginComponent () {


    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        membId: "",
        membPw: "",
    })

    // id, pw input handle event
    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    // 로그인 버튼 요청
    const originLogin = () => {
        // 입력한 login 정보
        let loginDto = {
            membId: userInfo.membId,
            membPw: userInfo.membPw,
        }
        // ID ,PW 유효성 검사
        if(!(validateLogin(loginDto.membId , loginDto.membPw))){
            return false;
        }

        login(loginDto)
            .then(response => {
                // login api request가 success면 response 객체에 accessToken이 담겨온다 그걸 session이든 local이든 set해서 사용하쟈.
                sessionStorage.setItem(ACCESS_TOKEN, response.accessToken);
                console.log(response)
                console.log('로그인에 성공하였습니다!');
                navigate("/go/common/mypage");
            }).catch(error => {
            alert('아이디나 비밀번호를 확인해주세요.');
        });
    }



    return (
        <div>
            <h3>로그인 페이지</h3>
            <Input
                id="id"
                style={{flexGrow: 1}}
                placeholder={"ID를 입력해 주세요 "}
                name="membId"
                value={userInfo.membId}
                onChange={handleChange}
            />
            <Input
                type="password"
                style={{ flexGrow: 1 }}
                placeholder="PASSWORD를 입력해 주세요 "
                name="membPw"
                value={userInfo.membPw}
                onChange={handleChange}
            />
            <Button
                style={{ flexGrow: 1 }}
                onClick={originLogin}
                value="로그인"
            />


            <a href={KAKAO_AUTH_URL}>
                <div className="kakao_btn"></div>
            </a>

        </div>
    )
}

const Input = styled.input`
border-radius: 4px;
border: 2px solid #e8e8e8;
padding: 10px;
font-size: 1rem;
margin: 15px;

&:focus {
    border: 2px solid #d32f2f;
    outline: none;
}
::placeholder {
    font-size: 0.8rem;
}

::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
`;

const KaKaoBtn = styled.div`
border-radius: 4px;
border: 2px solid yellow;
background-color:yellow;
padding: 10px;
font-size: 1rem;
margin: 15px;


::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
`;

export default LoginComponent