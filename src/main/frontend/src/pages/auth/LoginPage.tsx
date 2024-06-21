import styled from 'styled-components'
import React, {useState} from 'react'
import {useNavigate} from "react-router";
import {ACCESS_TOKEN, login} from "../../api/Api";
import {KAKAO_AUTH_URL, NAVER_AUTH_URL} from "../../api/OauthLoginUrl";
import '../../styles/style.css'
import '../../styles/css/loginPage.css'
import {validateLogin} from "../../services/validate";
import {useDispatch} from "react-redux";
import {loginAction} from "../../redux/slice/userSlice";
import ApiErrorHandle from "../../services/ApiErrorHandle";
import AlertComponent from "../calendar/component/AlertComponent";
import {UserLoginInfo} from "../../model/model";


const LoginPage = () => {
    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [closeCallBackFn , setCloseCallBackFn] = useState<()=>void>();

    const alertFunction =(closeCallBack: ()=> void , message:string)=>{
        setCloseCallBackFn(() => closeCallBack);
        setMessageCall(message);
        setShowAlert(true);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserLoginInfo>({
        membId: "",
        membPw: "",
    });

    // id, pw input handle event
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    // 로그인 버튼 요청
    const originLogin = () => {
        // 입력한 login 정보
        let loginDto:UserLoginInfo = {
            membId: userInfo.membId,
            membPw: userInfo.membPw,
        }
        // ID ,PW 유효성 검사
        const validateResult = validateLogin(loginDto.membId , loginDto.membPw);
        if (validateResult !== true) {
            alertFunction(()=>{} , validateResult);
            return;
        }

        login(loginDto)
            .then(response => {
                console.log(response);
                if(response.status === 'FAILURE'){
                    if(response.data.errorMessage === 'notF'){
                        alert('존재하지 않는 계정.');
                    }else if(response.data.errorMessage === 'notP'){
                        alert('비밀번호 오류.');
                    }
                }else if(response.status === 'SUCCESS'){
                    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken as string);
                    dispatch(loginAction(response.data.accessToken));
                    navigate("/calendar");
                }
            }).catch(error => {
                 ApiErrorHandle(error)
        });
    }



    return (
        <Wrap>
            <LoginWrap>
                <LoginWrapTop>로그인</LoginWrapTop>
                <LoginEmailBox>
                    <InputGroup>
                        <Input
                            id="id"
                            style={{flexGrow: 1}}
                            placeholder={""}
                            name="membId"
                            value={userInfo.membId}
                            onChange={handleChange}
                            required={true}
                        />
                        <Label>ID</Label>
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="password"
                            style={{ flexGrow: 1 }}
                            name="membPw"
                            value={userInfo.membPw}
                            onChange={handleChange}
                            required={true}
                        />
                        <Label>PW</Label>
                    </InputGroup>
                    <LoginButton
                        onClick={originLogin}
                    >로그인</LoginButton>
                    <div className="emailTextBox">
                        <span>아이디 찾기</span>
                        <span>비밀번호 찾기</span>
                        <span onClick={()=>navigate('/register')}>회원가입</span>
                    </div>
                </LoginEmailBox>

                <LoginWrapBox>
                    <a className="social_a kakao_btn" href={KAKAO_AUTH_URL}>
                        <svg width="30" height="45" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="login-button__item__logo">
                            <path
                                  d="M15 7C10.029 7 6 10.129 6 13.989C6 16.389 7.559 18.505 9.932 19.764L8.933 23.431C8.845 23.754 9.213 24.013 9.497 23.826L13.874 20.921C14.243 20.958 14.618 20.978 15 20.978C19.971 20.978 24 17.849 24 13.989C24 10.129 19.971 7 15 7Z"
                                  fill="black"></path>
                        </svg>
                        <span>카카오 로그인</span>
                    </a>
                    <a className="social_a naver_btn" href={NAVER_AUTH_URL}>
                        <span className="nLogo">n</span>
                        <span>네이버 로그인</span>
                    </a>
                </LoginWrapBox>
            </LoginWrap>


            {/* AlertComponent */}
            {showAlert &&(
                <AlertComponent
                    message= {messageCall}
                    onClose={()=> {
                        closeCallBackFn && closeCallBackFn();
                        setShowAlert(false);
                    }}
                />
            )}
            {/* AlertComponent */}
        </Wrap>

    )
}
const Wrap =styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content: center;
    background: #e8e8e8;
`
const LoginWrapTop = styled.div`
    text-align:center;
    background:skyblue;
    width:100%;
    height:50px;
    margin-bottom:40px;
    line-height:50px;
    color:white;
    font-weight:500;
    font-size:18px;
    box-shadow: 0 2px 4px 0 #e8e8e8;
`

const LoginEmailBox = styled.div`
    display:flex;
    flex-direction: column;
    width:80%;
    margin-top: 50px;
`

const LoginWrapBox = styled.div`
    display:flex;
    flex-direction: column;
    width:80%;
`

const LoginWrap = styled.div`   
    width:500px;
    height:100%;
    display:flex;
    align-items:center;
    flex-direction: column;
    justify-content: flex-start;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    background: white;
    
      @media (max-width: 768px) {
        border:none;
        width:100%;
      };
`
const InputGroup = styled.div`
    position:relative;
`
const Label = styled.label`
    position:absolute;
    left:15px;
    color:#e8e8e8;
    pointer-events:none;
    transform:translateY(10px);
    transition:150ms cubic-bezier(0.4,0,0.2,1);
`
const Input = styled.input`
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    font-size: 1rem;
    outline: none;
    border: 1px solid #e8e8e8;
    margin-bottom: 12px;
    transition:border 150ms cubic-bezier(0.4,0,0.2,1);

    &:focus , &:valid {
        outline: none;
        border:1.5px solid #1a73e8;
    }
    
    &:focus~label , &:valid~label{
        transform:translateY(-50%) scale(0.8);
        background-color:white;
        color:#2196f3;
        padding:3px;
    }
 
    
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
`;
const LoginButton = styled.button`
    width:100%;
    height:45px;
    color:white;
    background-color:skyblue;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    padding: 10px 6px 10px 6px;
    font-size: 1.1rem;
    cursor: pointer;
    outline:none;
    border: none;
    &:hover {
        // background-color: #d32f2f;
    }
`

export default LoginPage