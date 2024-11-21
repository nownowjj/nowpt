/**
 *
 * @param email
 * @param originEmail
 * @returns {boolean}
 * 이메일 변경 유효성 검사
 */
import {FixParam, NewRecordParam} from "../model/CalendarApiModel";

export function validateEmail(email:string,originEmail:string){
    console.log("검증 실행")
    if(email.length < 5){
        alert("값이 부족해");
        console.log("1 : 통과 못함");
        return false;
    }
    if( !(email.includes('@')) ){
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

/**
 * @author jiwon.kim
 * @param id
 * @param pw
 * @returns {boolean}
 * 로그인 유효성 검사
 */
export function validateLogin(id:string,pw:string){
    console.log(id , pw ,'dd');
    if(id === "" && pw === "")  return "아이디와 비밀번호를 입력해 주세요"
    return true;
}

/**
 *
 * @returns {boolean}
 * @param param
 * @param fixParam
 */
// export function validateNotice(noticeDto){
//     console.log(noticeDto)
//     if((noticeDto.noticeTitle) === ""){
//         alert("제목을 입력하지 않았습니다.")
//         return false;
//     }
//     if((noticeDto.noticeContent) === ""){
//         alert("내용을 입력하지 않았습니다.")
//         return false;
//     }
//     return true;
// }

const validateRecordInsertOrUpdate =(param:NewRecordParam , fixParam:FixParam)=>{
    const { title, content } = param;
    const { titleValue , contentValue } = fixParam;

    if (title.length > 100) {
        return '제목이 너무 길어요';
    }
    if (content.length > 2000) {
        return '내용이 너무 길어요'
    }
    if(!title.length){
        return '제목을 입력해 주세요'
    }
    if(!content.length){
        return '내용을 입력해 주세요'
    }
    if(title.length <= 1){
        return '제목이 너무 짧아요'
    }
    if(content.length <= 1){
        return '내용이 너무 짧아요'
    }
    if(title === titleValue && content === contentValue){
        return '바뀐게 없다'
    }

    return true;
}
export default validateRecordInsertOrUpdate;