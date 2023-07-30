import styled from 'styled-components'
import React, {useState} from 'react'
import {useNavigate} from "react-router";
import Button from "../component/JoinButton";
import {ACCESS_TOKEN, login} from "../api/Api";
import {KAKAO_AUTH_URL, NAVER_AUTH_URL} from "../api/OauthLoginUrl";
import '../styles/style.css'
import '../styles/css/loginPage.css'
import {validateLogin} from "../services/validate";
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/slice/userSlice";
import {useLocation} from "react-router-dom";
import ApiErrorHandle from "../services/ApiErrorHandle";

function LoginComponent () {
    const {state} = useLocation();
    console.log(state);

    const dispatch = useDispatch();

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
                if(response.status === 'FAILURE'){
                    if(response.data === 'notF'){
                        alert('존재하지 않는 계정.');
                    }else if(response.data === 'notP'){
                        alert('비밀번호 오류.');
                    }
                }else if(response.status === 'SUCCESS'){
                    console.log(response);
                    sessionStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                    dispatch(loginAction(response.data.accessToken));
                    navigate("/calendar");
                }
            }).catch(error => {
                 ApiErrorHandle(navigate,error)
        });
    }



    return (
        <LoginWrap>
            <LoginWrapTop>로그인</LoginWrapTop>
            <LoginEmailBox>
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
                    style={{ flexGrow: 1 ,width:"100%"}}
                    onClick={originLogin}
                    value="로그인"
                />
                <div className="emailTextBox">
                    <span>아이디 찾기</span>
                    <span>비밀번호 찾기</span>
                    <span>회원가입</span>
                </div>
            </LoginEmailBox>

            <LoginWrapBox>
                <a className="social_a" href={KAKAO_AUTH_URL}>
                    <div className="kakao_btn"></div>
                </a>
                <a className="social_a" href={NAVER_AUTH_URL}>
                    <div className="naver_btn"></div>
                </a>
            </LoginWrapBox>
        </LoginWrap>
    )
}
const LoginWrapTop = styled.div`
    text-align:center;
    background:skyblue;
    width:100%;
    height:50px;
    margin-bottom:50px;
    line-height:50px;
    color:white;
    font-weight:400;
    font-size:18px;
`

const LoginEmailBox = styled.div`
    display:flex;
    flex-direction: column;
    width:80%;
`

const LoginWrapBox = styled.div`
    display:flex;
    flex-direction: column;
    width:80%;
`

const LoginWrap = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    // justify-content: center;
    flex-direction: column;
    justify-content: flex-start;
`

const Input = styled.input`
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    font-size: 1rem;
    outline: none;
    border: none;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 5px;

&:focus {
    background:#e8e8e8;
    outline: none;
}
::placeholder {
    font-size: 0.8rem;
}

::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
-webkit-appearance: none;
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