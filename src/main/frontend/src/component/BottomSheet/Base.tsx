import React from "react";
import styled from 'styled-components';
import BottomSheet from "./BottomSheet";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store/store";
import {setInvisible} from "../../redux/slice/bottomSheetSlice";

const BaseDiv = styled.div`
  height : 100vh;
  width : 100vw;
  background-color: #e8e8e8;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 1 ;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  
`

interface BaseInterface {
    bottomComponent: JSX.Element;
}

const Base = ({bottomComponent}:BaseInterface) => {
    const isDismiss = useSelector((state: RootState) => state.bottomSheet.isDismiss);
    const dispatch = useDispatch();

    return (
        <>
            {isDismiss == false &&
                <>
                    <BaseDiv onClick={()=> dispatch(setInvisible())}/>
                    <BottomSheet component={bottomComponent}/>
                </>
            }
        </>
    )
}

export default Base