import React from 'react';
import styled from "styled-components";
import {TfiWrite} from "react-icons/tfi";

const MemoEmptyWrap = ({clickAction}:{clickAction:()=>void}) => {
    return (
        <MemoEmpty>
            <CustomTfiWrite/>
            <EmptyText>작성하신 메모가 없습니다.<br/>메모를 추가해보세요.</EmptyText>
            <EmptyButton onClick={clickAction}>메모 작성하기</EmptyButton>
        </MemoEmpty>
    );
};

const MemoEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top: 0;
  font-size: 14px;
`
const CustomTfiWrite = styled(TfiWrite)`
  font-size: 80px;
`

const EmptyText = styled.div`
  margin: 30px 0 40px;
  color: gray;
`

const EmptyButton = styled.div`

  background: black;
  border: 2px solid white;
  border-radius: 15px;
  outline: none;
  padding: 7px 20px;
  color: white;

`

export default MemoEmptyWrap;