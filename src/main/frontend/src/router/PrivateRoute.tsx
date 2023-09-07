import React from 'react';
import {Navigate} from 'react-router-dom';
import {RootState} from "../redux/store/store";
import {useSelector} from "react-redux";

interface PrivateRouteProps {
    component: React.ElementType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const isLogin = useSelector((state:RootState) => state.user.isLoggedIn);
    let { component: Component} = props
    
    return isLogin ? <Component/> : <Navigate to="/go/login"/>
};

export default PrivateRoute;
