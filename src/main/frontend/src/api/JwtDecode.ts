const getDecodedJwtJsonData =(token:string) =>{
    let jwtData = token.split('.')[1];
    return JSON.parse(window.atob(jwtData));
}

const isExpiredCall = ()=>{
    console.log("토큰이 있지만 만료되었음");
    window.location.href ="/page/isExpired";
    return;
}

export const isTokenExpiredFilter = (token:string):boolean=>{
    const decodeToken = getDecodedJwtJsonData(token);
    const currentTime = Date.now() / 1000; // 현재 시간 (Unix Epoch time)
    const isExpired = decodeToken.exp < currentTime;


    if(isExpired) isExpiredCall();

    return isExpired;
}


