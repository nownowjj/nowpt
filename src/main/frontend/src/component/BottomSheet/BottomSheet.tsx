import React from 'react';
import {BOTTOM_SHEET_HEIGHT} from './BottomSheetOption';
import styled from 'styled-components';
// import { motion } from "framer-motion";
import useBottomSheet from '../../hooks/useBottomSheet';
import Header from './Header';
import {IoMdClose} from "react-icons/io";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  top: calc(100% - 90px); /*시트가 얼마나 높이 위치할지*/
  left: 0;
  right: 0;
  border-radius: 22px 22px 0 0;
  height: ${BOTTOM_SHEET_HEIGHT}px;
  background: white;
  transition: transform 150ms ease-out; /*바텀시트 애니메이션 속도*/
`

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 20px;
`

const SheetContentTop = styled.div`
  text-align: right;
`
const CustomCloseButton = styled(IoMdClose)`
  color: lightgray;
  font-size: 26px;
`
const SheetContent = styled.div`
  padding-top:20px;
  height: fit-content;
`


interface BottomSheetInterface {
    component: JSX.Element
}
function BottomSheet({component}:BottomSheetInterface) {


    const {sheet, content,sheetDismiss} = useBottomSheet();

    return (
        <Wrapper ref={sheet} >
            <Header />
            <BottomSheetContent ref={content}>
                <SheetContentTop><CustomCloseButton onClick={()=> sheetDismiss()} /></SheetContentTop>  {/* sheet 상단 영역 */}
                <SheetContent>
                    {component}
                </SheetContent>
            </BottomSheetContent>
        </Wrapper>
    );
}

export default BottomSheet;