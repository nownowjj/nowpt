import React from "react";
import styled from 'styled-components';
import BottomSheet from "./BottomSheet";

const BaseDiv = styled.div`
  height : 100vh;
  width : 100vw;
  background-color: #e8e8e8;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 1 ;
  position: absolute;
  top: 0;
  left: 0;
  
`

export default function Base() {

    return (
        <>
        <BaseDiv/>
        <BottomSheet />
        </>
    )
}