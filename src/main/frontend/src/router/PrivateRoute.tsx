import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";

const PrivateRoute = (): React.ReactElement => {
    const isLogin = useSelector((state: RootState) => state.user.isLoggedIn);
    return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default  PrivateRoute