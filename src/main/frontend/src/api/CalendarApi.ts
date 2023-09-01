import {API_BASE, ApiResponse, CALENDAR, request} from "./Api";
// import { URLSearchParams } from "url"
import {
    CalendarSnParam,
    CalenderDto, CalenderMyInfoDto,
    CalenderPagingDto,
    ImportParam,
    NewRecordParam,
    RecordDate
} from "../model/CalendarApiModel";

export function commonSearchParam(param: Record<string, any>){
    const queryParams = new URLSearchParams();
    for (const key in param) {
        if (param.hasOwnProperty(key)) {
            queryParams.append(key, param[key]);
        }
    }
    return queryParams.toString();
}


// {recordDate:string}
export function getMyCalendar(param:RecordDate){
    return request({
        url: API_BASE + CALENDAR,
        method: 'POST',
        body: JSON.stringify(param)
    })
}

// {recordDate:string}
export function getMyDetailCalendar(param:RecordDate):Promise<ApiResponse<CalenderDto[]>>{
    const url = API_BASE + CALENDAR;
    // const queryParams = new URLSearchParams(param).toString();
    const fullUrl = url + "?" + commonSearchParam(param);
    return request({
        url: fullUrl,
        method: 'GET'
    })
}

//  {recordDate:string ,calendarSn:number|null,title:string, content:string ,importYn:string}
export function insertRecord(param:NewRecordParam){
    return request({
        url: API_BASE + CALENDAR + '/insert',
        method: 'POST',
        body: JSON.stringify(param)
    })
}

//  {calendarSn:number}
export function deleteRecord(param:CalendarSnParam){
    const url = API_BASE + CALENDAR;
    const fullUrl = url + "?" + commonSearchParam(param);
    return request({
        url: fullUrl,
        method: 'DELETE',
        body: JSON.stringify(param)
    })
}


export function getMyInfoAndRecord():Promise<ApiResponse<CalenderMyInfoDto>>{
    return request({
        url: API_BASE + '/calendar/myRecord',
        method: 'GET'
    })
}

//   param :{calendarSn:number  , importYn:boolean}
export function importRecord(param:ImportParam):Promise<ApiResponse<CalenderDto>>{
    const url = API_BASE + CALENDAR;
    const fullUrl = url + "?" + commonSearchParam(param);
    console.log(fullUrl);
    return request({
        url: fullUrl,
        method: 'PUT',
        body: JSON.stringify(param)
    })
}

//  pageNumber :number
export function selectImportRecordPaging(pageNumber:number):Promise<ApiResponse<CalenderPagingDto>> {
    console.log(pageNumber);
    return request({
        url: API_BASE + CALENDAR + "/import?page=" + pageNumber +
            "&size=" + 10,
        method: 'GET'
    });
}



