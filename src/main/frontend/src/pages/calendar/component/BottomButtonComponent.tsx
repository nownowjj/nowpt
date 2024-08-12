import React from 'react';
import styled from "styled-components";

interface BottomButtonProps {
    clickFunction: () => void;
    buttonText: string;
}

/**
 * 공통 하단 버튼 컴포넌트
 * @param clickFunction
 * @param buttonText
 */
const BottomButtonComponent = ({clickFunction,buttonText}:BottomButtonProps) => {
    return (
        <BottomButton onClick={clickFunction}>
            {buttonText}
        </BottomButton>
    );
};

const BottomButton = styled.button`
  width: 100%;
  height: 35px;
  outline: none;
  background: skyblue;
  border: 1px solid #e8e8e8;
  border-radius: 15px;
  color: white;
  position: relative;
  font-size: 16px;
  
  &:disabled{
    background: #e8e8e8;
  }
  
  @media (max-width: 768px) {
    position: fixed;
    bottom: 10px;
    width: 90%;
    left: 50%;
    transform: translate(-50%,-50%);
  };
`
export default BottomButtonComponent;