export function validateEmail(email,originEmail){
    console.log("검증 실행")
    if(email.length < 5){
        alert("값이 부족해");
        console.log("1 : 통과 못함");
        return false;
    }
    if( (email.includes('@')) === false ){
        alert("@ 없어요");
        console.log("2 : 통과 못함");
        return false;
    }
    if(email === originEmail){
        alert("값이 똑같아요");
        return false;
    }
    console.log("다 통과함");
    return true;
}