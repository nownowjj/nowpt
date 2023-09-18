import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";

const UserEtt = () => {
    // let userEtt = {"exp":"" , "iat" : "", "membEmail":"",  "membId":"" , "membPw":"" , "roles":"" , "profileImage":"" , "isLogin": false};
    let userEtt: { isLogin: boolean; membEmail: string; membPw: string; roles: string; membId: string; profileImage: string; exp: number; iat: number } = {
        exp: 0,
        iat: 0,
        membEmail: "",
        membId: "",
        membPw: "",
        roles: "",
        profileImage: "",
        isLogin: false,
    };
    const user = useSelector((state:RootState) => state.user.user);
    const isLogin = useSelector((state:RootState) => state.user.isLoggedIn);
    if (user != null) {
        userEtt = {
            ...user ,
            isLogin:isLogin
        };
    }
    return userEtt;
};

export default UserEtt;