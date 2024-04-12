import React, {useState} from 'react';
import axios from "axios";

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
const MailPage = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/sendEmail', {
                to: email,
                subject: subject,
                body: body
            });
            alert('이메일이 성공적으로 전송되었습니다!');
        } catch (error) {
            console.error('이메일 전송 중 오류가 발생했습니다:', error);
            alert('이메일 전송 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>이메일 보내기</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    수신자 이메일:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    제목:
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </label>
                <label>
                    내용:
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} />
                </label>
                <button type="submit">전송</button>
            </form>
        </div>
    );
};

export default MailPage;