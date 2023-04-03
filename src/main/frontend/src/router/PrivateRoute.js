import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";



const PrivateRoute = (props) => {
    const isLogin = useSelector((state) => state.user.value.isLoggedIn);
    if(!isLogin){alert("로그인이 필요합니다.");}
    let { component: Component} = props

    return isLogin ?
        <Component/>
        :
        <Navigate to="/go/login"/>
};

export default PrivateRoute;
