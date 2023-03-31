import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";



const PrivateRoute = (props) => {
    const isLogin = useSelector((state) => state.user.value.isLoggedIn);
    let { component: Component} = props
    // let { component: Component, children, render, ...rest } = props

    return isLogin ?
        <Component/>
        // <Route path={path} element={Component} />
        :
        <Navigate to="/go/login"/>
};

export default PrivateRoute;

// import { Navigate } from 'react-router-dom';
//
// const Private = (Component) => {
//     const auth = false; //your logic
//
//     return auth ? <Component /> : <Navigate to="/login" />
// }