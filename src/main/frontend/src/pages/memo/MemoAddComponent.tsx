import React, {useState} from 'react';
import styled from "styled-components";
import {BiTrash} from "react-icons/bi";
import {IoCheckmarkOutline} from "react-icons/io5";
import {insertMemo, MemoResponseType} from "../../api/Memo";
import {useQueryClient} from "react-query";
import {useDispatch} from "react-redux";
import {setInvisible} from "../../redux/slice/bottomSheetSlice";
import {useConfirm} from "../../hooks/useConfirm";
import ConfirmComponent from "../calendar/component/ConfirmComponent";
import AlertComponent from "../calendar/component/AlertComponent";
import {route} from "../../services/remocon";



const MemoAddComponent = ({ data }: { data: MemoResponseType | null }) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { showAlert, messageCall, confirmFunction, handleConfirm, handleClose } = useConfirm();
    
    const [memo, setMemo] = useState({
        title: data ? data.title : '' ,
        content: data ? data.content : ''
    });

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setMemo(prevMemo => ({
            ...prevMemo,
            [name]: value
        }));
    };


    // 메모 작성
    const upsertMemo = async (isDeleteRequest=false)=>{
        const param = { ...memo, memoSn: data?.memoSn  , useYn  :  'Y'   };
        if(isDeleteRequest) param.useYn = 'N'
        await insertMemo(param)
        queryClient.invalidateQueries(['myMemo'])
        dispatch(setInvisible())
    }

    return (
        <MemoAddComponentWrap>
            <MemoTop>
                <MemoTitle name="title" value={memo.title} onChange={handleInputChange} type="text" maxLength={100} placeholder='제목입력'/>
                {data && <ScheduleButton onClick={()=> upsertMemo(true)}><BiTrash/> </ScheduleButton>}
                <ScheduleButton onClick={()=> upsertMemo()} style={{marginLeft : "3px"}}> <IoCheckmarkOutline/> </ScheduleButton>
            </MemoTop>
            <MemoContent name="content" value={memo.content} onChange={handleInputChange} maxLength={2000} placeholder='내용입력'/>


            {/* AlertComponent */}
            {showAlert &&(
                <AlertComponent
                    message= {messageCall}
                    onClose={()=> {
                        handleConfirm()
                    }}
                />
            )}
            {/* AlertComponent */}
        </MemoAddComponentWrap>
    );
};

const MemoTop = styled.div`
  display: flex;
  justify-content: space-between;
`

const ScheduleButton= styled.button`
  border: none;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
`

const MemoAddComponentWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 600px;
`

const MemoContent = styled.textarea`
    width: 100%;
    border: none;
    border-radius: 5px;
    height: 400px;
    outline: none;
    resize: none;
    padding-top: 10px;
`

const MemoTitle = styled.input`
    width: 70%;
    border:none;
    outline:none;
    font-size: 18px;
`


export default MemoAddComponent;