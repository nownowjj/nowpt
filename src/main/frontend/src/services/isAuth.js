import {ACCESS_TOKEN} from "../api/Api";

const isAuth=()=>{
    console.log("isAuth");
    if(sessionStorage.getItem(ACCESS_TOKEN) != null){
            let jwt = sessionStorage.getItem(ACCESS_TOKEN);
            let jwtData = jwt.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
            let Auth = decodedJwtData.roles;
            console.log(Auth)
        return Auth;
    }else{
        return null;
    }
}

export default isAuth;