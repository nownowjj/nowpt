import {API_BASE, ApiResponse, DELETE, POST, request} from "./Api";
import {ScheduleDetailType} from "../model/CalendarApiModel";

export interface ScheduleSn{
    scheduleSn:number;
}

export function deleteSchedule(param:ScheduleSn):Promise<ApiResponse<ScheduleDetailType>>{
    console.log(param);
    return request({
        url: API_BASE  + "/schedule" ,
        method: DELETE,
        body: JSON.stringify(param)
    })
}
export function insertScheduleApi(param:ScheduleDetailType):Promise<ApiResponse<ScheduleDetailType>>{
    console.log(param);
    return request({
        url: API_BASE  + "/schedule" ,
        method: POST,
        body: JSON.stringify(param)
    })
}