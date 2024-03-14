import React from 'react';
import {BOTTOM_SHEET_HEIGHT} from './BottomSheetOption';
import styled from 'styled-components';
// import { motion } from "framer-motion";
import useBottomSheet from './useBottomSheet';
import Header from './Header';
import Content from './Content';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 1;
  top: calc(100% - 90px); /*시트가 얼마나 높이 위치할지*/
  left: 0;
  right: 0;

  border-radius: 22px 22px 0 0;
  
  //box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${BOTTOM_SHEET_HEIGHT}px;

  background: white;
  //background: linear-gradient(359.26deg, #3C41C7 0.02%, #3742B2 83.23%, #3642AE 98.76%);
  //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: transform 250ms ease-out; /*바텀시트 애니메이션 속도*/
`

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

function BottomSheet() {

    const {sheet, content} = useBottomSheet();

    return (
        <Wrapper ref={sheet}>
            <Header/>
            <BottomSheetContent ref={content}>
                <Content/>
            </BottomSheetContent>
        </Wrapper>
    );
}

export default BottomSheet;