import React from 'react';
import styled from "styled-components";
import {imgHelper} from "../../../services/imgHelper";

const AdminMenuComponent = () => {
    return (
        <MenuWrap>
            <img src={imgHelper.ggwak}/>
            <MenuListWrap>
                <li>사용자 관리</li>
                <li>공지사항 관리</li>
            </MenuListWrap>
        </MenuWrap>
    );
};

const MenuWrap =styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 200px;
  border: 1px solid black;
  background: #FFF;
`

const MenuListWrap = styled.ul`
  display: flex;
  flex-direction: column;
  
  
`

export default AdminMenuComponent;