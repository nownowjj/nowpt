import React from 'react';
import ConfirmComponent from "../component/ConfirmComponent";
import {useConfirm} from "../../../hooks/useConfirm";

/**
 *   Layout  ConfirmLayout 추가하여 confirm 호출하는 곳에서는  handleConfirm 값만 셋팅 하면 됨
 */
const ConfirmLayout = () => {
    const { showAlert, messageCall, handleConfirm, handleClose } = useConfirm();
    return (
        <>
            {showAlert &&(
                <ConfirmComponent
                    message= {messageCall}
                    okCallBack={() => {
                        handleConfirm()
                    }}
                    onClose={()=> handleClose()}
                />
            )}
        </>
    );
};

export default ConfirmLayout;