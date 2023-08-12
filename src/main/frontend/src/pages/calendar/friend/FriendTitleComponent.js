import React from 'react';
import styled from "styled-components";

const FriendTitleComponent = ({title , size}) => {
    return (
        <FriendTitleComponentWrap>
            <span>{title}</span>
            {
                size && <span style={{color:"red"}}> {size}</span>
            }
        </FriendTitleComponentWrap>
    );
};

const FriendTitleComponentWrap = styled.div`
    font-size:18px;
    font-weight:550;
    margin-top:10px;
`
export default FriendTitleComponent;