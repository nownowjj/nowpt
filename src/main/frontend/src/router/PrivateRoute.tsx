import React from 'react';
import {Navigate} from 'react-router-dom';
import {RootState, useTypedSelector} from "../redux/store/store";

interface PrivateRouteProps {
    component: React.ElementType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const isLogin = useTypedSelector((state:RootState) => state.user.isLoggedIn);
    let { component: Component} = props
    
    return isLogin ? <Component/> : <Navigate to="/go/login"/>
};

export default PrivateRoute;
