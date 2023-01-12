import {ACCESS_TOKEN} from "../api/Api";

const idId=()=>{
    // console.log("isAuth");
    if(sessionStorage.getItem(ACCESS_TOKEN) != null){
            let jwt = sessionStorage.getItem(ACCESS_TOKEN);
            let jwtData = jwt.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
        return decodedJwtData.membId;
    }else{
        return null;
    }
}

export default idId;