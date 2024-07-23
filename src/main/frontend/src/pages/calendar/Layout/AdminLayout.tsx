import React, {JSX} from 'react';
import ConfirmLayout from "./ConfirmLayout";
import AdminMenuComponent from "./AdminMenuComponent";
import styled from "styled-components";
import AdminTopComponent from "./AdminTopComponent";

interface AdminLayoutInterface {
    children: JSX.Element;

}

const AdminLayout = ({children}:AdminLayoutInterface) => {
    return (
        <React.Fragment>
            <AdminMenuComponent/>
            <ComponentWrap>
                <AdminTopComponent/>
                {children}
            </ComponentWrap>
            <ConfirmLayout/>
        </React.Fragment>
    );
};

const ComponentWrap = styled.div`
  width: 100vw;
  padding-left: 200px;
  height: fit-content;
  min-height: 100vh;
  background: #e8e8e8;
`

export default AdminLayout;