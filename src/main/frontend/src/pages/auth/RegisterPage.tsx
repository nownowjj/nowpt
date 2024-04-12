import React, {useState} from 'react';
import CalendarLayout from "../calendar/Layout/CalendarLayout";
import styled from "styled-components";
import EmailComponent from "./EmailComponent";
import RegisterPasswordComponent from "./RegisterPasswordComponent";


/**
 *  Email 회원 가입 프로세스 정리
 *  1. 가입할 이메일과 비밀번호를 입력 받는다. (이메일 형식,비밀번호 형식 체크)
 *  2. 입력한 이메일 중복 체크 수행. (이메일 중복 발생 시에 다른 이메일을 입력 받도록 한다.)
 *  3. 이메일 중복 체크 후 유효한 이메일이면 인증 코드 발송 로직 실행
 *  4. 생성한 인증 코드 , 이메일 , 유효시간(생성 시간 + 3분) DB Insert
 *  5. 인증 코드 발송 후 화면에 3분 카운트 시작 => 3분 안에 입력하지 못할시에 인증 코드 재전송 버튼 활성화
 *  6. 인증 코드 체크 수행 -> 불일치시에 불일치 문구 생성 , 일치시에 다음 페이지로 넘어감
 *  7. 사용할 프로필 선택 및 회원정보 수집
 *  .
 */

const RegisterPage = () => {
    const [email , setEmail] = useState("");
    const handleEmail=(updateEmail:string)=>{
        setEmail(updateEmail)
        console.log(email);
    }

    const [viewComponent, setViewComponent] = useState(<EmailComponent email={email} handle={handleEmail}/>);

    const changeComponent =(component:JSX.Element)=>{
        setViewComponent(component)
    }


    return (
        <CalendarLayout gnbTitle={"회원가입"} useBottom={false}>
            <RegisterWrap>
                <button onClick={() => changeComponent(<EmailComponent email={email} handle={handleEmail}/>)}>Email</button>
                <button onClick={() => changeComponent((RegisterPasswordComponent()))}>Two</button>
                {viewComponent}
            </RegisterWrap>
        </CalendarLayout>
    );
};

const RegisterWrap = styled.div`
  width: 100%;
  padding-top: 50px;
`

export default RegisterPage;