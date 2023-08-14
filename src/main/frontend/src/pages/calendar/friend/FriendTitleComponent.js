import React, {useState} from 'react';
import styled from "styled-components";
import {CgSearch} from "react-icons/cg";
import {MdSearch, MdSearchOff} from "react-icons/md";

/**
 *
 * @param title   공통
 * @param size   친구 요청에서만 사용
 * @param search 친구추천에서만 사용
 * @param mode   친구추천에서만 사용
 */
const FriendTitleComponent = ({title , size}) => {
    return (
        <FriendTitleComponentWrap>
            <span>
                {title}
                {
                    size && <span style={{color:"red"}}> {size}</span>
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