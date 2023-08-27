import {useSelector} from "react-redux";

const UserEtt = () => {
    let userEtt = {"exp":"" , "iat" : "", "membEmail":"",  "membId":"" , "membPw":"" , "roles":"" , "profileImage":"" , "isLogin": false};
    const user = useSelector((state) => state.user.value.user);
    const isLogin = useSelector((state) => state.user.value.isLoggedIn);
    if (user != null) {
        userEtt = {
            ...user ,
            "isLogin":isLogin
        };
    }
    return userEtt;
};

export default UserEtt;