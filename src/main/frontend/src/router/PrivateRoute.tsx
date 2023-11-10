import React from 'react';
import {Navigate} from 'react-router-dom';
import {RootState} from "../redux/store/store";
import {useSelector} from "react-redux";

interface PrivateRouteProps {
    element: React.ElementType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const isLogin = useSelector((state: RootState) => state.user.isLoggedIn);
    const { element: Element } = props;

    return isLogin ? <Element /> : <Navigate to="/go/login" />;
};

export default PrivateRoute;
