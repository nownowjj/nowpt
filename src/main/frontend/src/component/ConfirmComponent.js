import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router";

const ConfirmComponent = ({confirmText, successText, resolveFunction, rejectFunction}) => {
    console.log(`ConfirmComponent`);
    const navigate = useNavigate();


    return (
        <Confirm>
            <ConfirmTextArea>
                {confirmText.split("\n").map((confirmText) => (
                    <>
                        {confirmText}
                        <br/>
                    </>
                ))}
            </ConfirmTextArea>

            <ConfirmYesOrNot>
                <ConfirmYesOrNotText style={{borderRight:"1px solid black"}} onClick={() => (navigate(resolveFunction))}>
                    {successText}
                </ConfirmYesOrNotText>
                <ConfirmYesOrNotText onClick={() => rejectFunction(false)}>
                    취소
                </ConfirmYesOrNotText>
            </ConfirmYesOrNot>
        </Confirm>
    );
};

export default ConfirmComponent;

const Confirm = styled.div`
    border : 1px solid #e8e8e8;
    width : 500px;
    height : 400px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background : #eeeeee;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
}
`;
const ConfirmTextArea = styled.div`
    border:1px solid black;
    width:100%;
    height : 60%;
    text-align : center;
    color : blue;
    display: flex;
    align-items: center;
    justify-content: center;
}`;

const ConfirmYesOrNot = styled.div`
   border:1px solid gray;
    width:100%;
    height : 40%;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
}`;
const ConfirmYesOrNotText = styled.div`
   color:red;
   width:50%;
   height:100%;
   text-align:center;
   display:flex;
   align-items:center;
   justify-content:center;
    &:hover{  
    background-color : skyblue;
    color : blue
  };
   
}`;