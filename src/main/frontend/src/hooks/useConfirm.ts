import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store/store";
import {isNoShowConfirm, isShowConfirm, setMessage, setOkCallBackFn} from "../redux/slice/confirmSlice";

export const useConfirm = () => {
    const dispatch = useDispatch();

    const showAlert = useSelector((state:RootState) => state.confirm.showConfirm);
    const messageCall = useSelector((state:RootState) => state.confirm.message);
    const okCallBackFn = useSelector((state:RootState) => state.confirm.okCallBackFn);

    const confirmFunction = (okCallBack: () => void, message: string) => {
        dispatch(setOkCallBackFn(okCallBack));
        dispatch(setMessage(message));
        dispatch(isShowConfirm())
    };

    const handleConfirm = () => {
        okCallBackFn && okCallBackFn(); // 확인 버튼 클릭 시, 콜백 함수를 실행
        handleClose()
    };

    const handleClose = () => {
        dispatch(isNoShowConfirm())
    };

    return { showAlert, messageCall, confirmFunction, handleConfirm, handleClose };
};