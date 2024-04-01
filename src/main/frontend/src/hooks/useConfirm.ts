import { useState } from 'react';

export const useConfirm = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [okCallBackFn, setOkCallBackFn] = useState<() => void>();

    const confirmFunction = (okCallBack: () => void, message: string) => {
        setOkCallBackFn(() => okCallBack);
        setMessageCall(message);
        setShowAlert(true);
    };

    const handleConfirm = () => {
        okCallBackFn && okCallBackFn(); // 확인 버튼 클릭 시, 콜백 함수를 실행
        setShowAlert(false);
    };

    const handleClose = () => {
        setShowAlert(false);
    };

    return { showAlert, messageCall, confirmFunction, handleConfirm, handleClose };
};