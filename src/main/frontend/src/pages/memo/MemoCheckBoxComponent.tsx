import React from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store/store";
import {setMemoLists} from "../../redux/slice/memoSlice";

const MemoCheckBoxComponent = ({checkKey}:{checkKey:number}) => {
    const dispatch = useDispatch();
    const deleteSnLists = useSelector((state: RootState) => state.memo.deleteSnLists);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        // 체크박스가 체크되었을 때는 deleteSnLists에 추가합니다.
        if (isChecked) {
            dispatch(setMemoLists([...deleteSnLists, checkKey]));
        }
        // 체크박스가 해제되었을 때는 deleteSnLists에서 제거합니다.
        else {
            const updatedList = deleteSnLists.filter(sn => sn !== checkKey);
            dispatch(setMemoLists(updatedList));
        }
    };

    return (
        <MemoCheckBoxComponentWrap>
            <CheckBox id={`${checkKey}`}  type="checkbox" onChange={handleCheckboxChange}/>
            <label htmlFor={`${checkKey}`}></label>
        </MemoCheckBoxComponentWrap>
    );
};

const MemoCheckBoxComponentWrap = styled.div`
  position: absolute;
  top: 3px;
  right: 5px;
  width: 20px;
  height: 20px;
  z-index: 2;
`
const CheckBox = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: 1.5px solid gainsboro;
  border-collapse: collapse;
  box-sizing: border-box;
  appearance: none;
  border-radius: 50%;
  background: white;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: gainsboro;
  }
`

export default MemoCheckBoxComponent;