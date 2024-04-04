import {API_BASE, ApiResponse, CALENDAR, DELETE, GET, POST, PUT, request} from "./Api";
// import { URLSearchParams } from "url"
import {
    CalendarDto,
    CalendarMyInfoDto,
    CalendarSnParam,
    ImportParam,
    NewRecordParam,
    RecordDate, ScheduleDetailType,
} from "../model/CalendarApiModel";
import {PagingResponse} from "../model/Common";

// import {ScheduleResponseType, ScheduleType} from "../pages/calendar/CalendarPage";

export function commonSearchParam(param: Record<string|number, any>){
    const queryParams = new URLSearchParams();
    for (const key in param) {
        if (param.hasOwnProperty(key)) {
            queryParams.append(key, param[key]);
        }
    }
    return queryParams.toString();
}


// {recordDate:string}
export function getMyCalendar(param:RecordDate):Promise<ApiResponse<string[]>>{
    return request({
        url: API_BASE + CALENDAR + "?recordDate="+param.recordDate,
        method: GET
    })
}

export function getMySchedule(param:RecordDate):Promise<ApiResponse<ScheduleDetailType[]>>{
    return request({
        url: API_BASE  +"/schedule"+ "?date="+param.recordDate,
        method: GET
    })
}

// {recordDate:string}
export function getMyDetailCalendar(param:RecordDate):Promise<ApiResponse<CalendarDto[]>>{
    const url = API_BASE + CALENDAR + "/detail";
    const fullUrl = url + "?" + commonSearchParam(param);

    return request({
        url: fullUrl,
        method: GET
    })
}

//  {recordDate:string ,calendarSn:number|null,title:string, content:string ,importYn:string}
export function insertRecord(param:NewRecordParam){
    return request({
        url: API_BASE + CALENDAR ,
        method: POST,
        body: JSON.stringify(param)
    })
}

export function deleteRecord(param:CalendarSnParam):Promise<ApiResponse<number>>{
    const url = API_BASE + CALENDAR;
    const fullUrl = url + "?" + commonSearchParam(param);
    return request({
        url: fullUrl,
        method: DELETE,
    })
}


export function getMyInfoAndRecord():Promise<ApiResponse<CalendarMyInfoDto>>{
    return request({
        url: API_BASE + CALENDAR + '/myRecord',
        method: GET
    })
}

//   param :{calendarSn:number  , importYn:boolean}
export function importRecord(param:ImportParam):Promise<ApiResponse<CalendarDto>>{
    const url = API_BASE + CALENDAR;
    const fullUrl = url + "?" + commonSearchParam(param);
    return request({
        url: fullUrl,
        method: PUT
        // body: JSON.stringify(param)
    })
}

//  pageNumber :number
export function selectImportRecordPaging(pageNumber:number):Promise<ApiResponse<PagingResponse<CalendarDto[]>>> {
    console.log(pageNumber);
    return request({
        url: API_BASE + CALENDAR + "/import?page=" + pageNumber +
            "&size=" + 10,
        method: GET
    });
}



