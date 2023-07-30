/**
 * 
 * @param email 
 * @param originEmail
 * @returns {boolean}
 * 이메일 변경 유효성 검사
 */
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

/**
 * @author jiwon.kim
 * @param id
 * @param pw
 * @returns {boolean}
 * 로그인 유효성 검사
 */
export function validateLogin(id,pw){
    console.log("validate")
    if(id === "" || pw === ""){
        alert("Id 또는 PassWord를 입력하지 않았습니다. ")
        return false;
    }
    return true;
}

/**
 * 
 * @param noticeDto
 * @returns {boolean}
 */
export function validateNotice(noticeDto){
    console.log(noticeDto)
    if((noticeDto.noticeTitle) === ""){
        alert("제목을 입력하지 않았습니다.")
        return false;
    }
    if((noticeDto.noticeContent) === ""){
        alert("내용을 입력하지 않았습니다.")
        return false;
    }
    return true;
}

const validateRecordInsertOrUpdate =(param)=>{
    const { title, content } = param;
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
    if(content.length <= 3){
        return '내용이 너무 짧아요'
    }

    return true;
}
export default validateRecordInsertOrUpdate;