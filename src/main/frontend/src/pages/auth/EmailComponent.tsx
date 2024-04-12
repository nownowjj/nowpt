import React, {useState} from 'react';


const EmailComponent = ({ email, handle }: { email: string; handle: (updateEmail: string) => void; }) => {
    const [updateEmail, setUpdateEmail] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("sadsa");
        const updatedValue = e.target.value;
        setUpdateEmail(updatedValue);
        handle(updatedValue); // handle 함수를 호출하여 부모 컴포넌트의 상태를 업데이트합니다.
    };

    return (
        <div>
            <input value={email} onChange={handleInputChange} />
            이메일 입력해라ss
        </div>
    );
};

export default EmailComponent;