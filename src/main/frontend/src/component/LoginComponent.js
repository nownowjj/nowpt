import styled from 'styled-components'
import React, {useState} from 'react'
import {useNavigate} from "react-router";
import Button from "./items/JoinButton";
import {ACCESS_TOKEN, login} from "../api/Api";
import {responseData} from "./HeaderComponent";
import isAuth from "./isAuth";

function LoginComponent () {


    // navagate
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
    const handleSubmit = (e) => {

        // 의미 없는 요청 막기?
        e.preventDefault();

        // client가 입력한 login 정보
        let loginDto = {
            membId: userInfo.membId,
            membPw: userInfo.membPw,
        }


        // login api request - fetch api
        login(loginDto)
            .then(response => {
                // login api request가 success면 response 객체에 accessToken이 담겨온다 그걸 session이든 local이든 set해서 사용하쟈.
                sessionStorage.setItem(ACCESS_TOKEN, response.accessToken);
                // console.log(response)
                // console.log("accessToken : " + response.accessToken);
                // console.log("tokenType :  " + response.tokenType);
                // console.log("role : " + response.role);

                let jwt = response.accessToken;

                let jwtData = jwt.split('.')[1];
                let decodedJwtJsonData = window.atob(jwtData);
                let decodedJwtData = JSON.parse(decodedJwtJsonData);
                let isAdmin = decodedJwtData.roles;
                console.log('Is admin: ' + isAdmin);


                // console.log("==================")
                // console.log('jwtData: ' + jwtData)
                // console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
                // console.log('decodedJwtData: ' + decodedJwtData)
                alert('로그인에 성공하였습니다!');
                navigate("/api/test");
            }).catch(error => {
            alert('아이디나 비밀번호를 확인해주세요.');
        });
        // console.log("login 함수 종료")
    }

    return (
        <div>
            {/**/}
            <div>
               {/*<HeaderComponent value="sss"></HeaderComponent>*/}
            </div>
            {/**/}
            <h3>로그인 페이지</h3>
            <form onSubmit={handleSubmit}>
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
                type="submit"
                value="로그인"
            />
            </form>
        </div>
    )
}

const Input = styled.input`
border-radius: 4px;
border: 2px solid #ef4746;
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

export default LoginComponent