import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";



const PrivateRoute = (props) => {
    const isLogin = useSelector((state) => state.user.value.isLoggedIn);
    let { component: Component} = props
    
    return isLogin ?
        <Component/> : <Navigate to="/go/login"/>
};

export default PrivateRoute;
