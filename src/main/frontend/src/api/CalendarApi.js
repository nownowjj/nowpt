import {API_BASE, CALENDAR, request} from "./Api";

//  추출
export function getMyCalendar(param){
    return request({
        url: API_BASE  + CALENDAR ,
        method:'POST',
        body:JSON.stringify(param)
    })
}

export function getMyDetailCalendar(param){
    const url = API_BASE + CALENDAR;
    const queryParams = new URLSearchParams(param).toString();
    const fullUrl = url + "?" + queryParams;
    return request({
        url: fullUrl ,
        method:'GET'
    })
}

export function insertRecord(param){
    return request({
        url: API_BASE  + CALENDAR  + '/insert',
        method:'POST',
        body:JSON.stringify(param)
    })
}

export function deleteRecord(param){
    const url = API_BASE + CALENDAR;
    const queryParams = new URLSearchParams(param).toString();
    const fullUrl = url + "?" + queryParams;
    console.log(fullUrl);
    return request({
        url: fullUrl ,
        method:'PUT',
        body:JSON.stringify(param)
    })
}




