import React from 'react';
import {useSelector} from "react-redux";

const UserEtt = () => {
    let userEtt = {"exp":"" , "iat" : "", "membEmail":"",  "membId":"" , "membPw":"" , "roles":"" , "profileImage":""};
    const user = useSelector((state) => state.user.value.user);
    if (user != null) {
        userEtt = {
            ...user
        };
    }
    return userEtt;
};

export default UserEtt;