import {API_BASE, NOTIFICATION, request} from "./Api";

export function getMyNotification(pageNumber, countMode=false){
    const url = API_BASE + NOTIFICATION;
    const param = "?page="+pageNumber+"&size=10&countMode="+countMode
    const requestUrl = url+ param
    console.log("countMode",countMode);
    return request({
        url: requestUrl,
        method: 'GET'
    });
}

// export function getMyDetailCalendar(param){
//     const url = API_BASE + CALENDAR;
//     const queryParams = new URLSearchParams(param).toString();
//     const fullUrl = url + "?" + queryParams;
//     return request({
//         url: fullUrl ,
//         method:'GET'
//     })
// }
//
// export function insertRecord(param){
//     return request({
//         url: API_BASE  + CALENDAR  + '/insert',
//         method:'POST',
//         body:JSON.stringify(param)
//     })
// }
//
export function deleteAllNotification(){
    return request({
        url: API_BASE + NOTIFICATION ,
        method:'DELETE'
    })
}
//
// export function getMyInfoAndRecord(){
//     return request({
//         url: API_BASE  + '/calendar/myRecord' ,
//         method:'GET'
//     })
// }
//
export function updateNotification(param){
    return request({
        url: API_BASE + NOTIFICATION ,
        method:'PUT',
        body:JSON.stringify(param)
    })
}
//
// export function selectImportRecordPaging(pageNumber) {
//     console.log(pageNumber);
//     return request({
//         url: API_BASE + CALENDAR +"/import?page="+pageNumber+
//             "&size="+10,
//         method: 'GET'
//     });
// }



