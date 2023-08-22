import React from 'react';
import styled from "styled-components";

/**
 *
 * @param title   공통
 * @param size   친구 요청에서만 사용
 * @param color  문구 색상
 */
const FriendTitleComponent = ({title , size , color}) => {
    return (
        <FriendTitleComponentWrap>
            <span>
                {title}
                {
                    size && <span style={{color:color}}> {size}</span>
                }
            </span>
        </FriendTitleComponentWrap>
    );
};

const FriendTitleComponentWrap = styled.div`
    font-size:18px;
    font-weight:550;
    margin-top:10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export default FriendTitleComponent;