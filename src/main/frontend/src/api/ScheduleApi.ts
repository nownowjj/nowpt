import {API_BASE, ApiResponse, DELETE, request} from "./Api";

export interface ScheduleSn{
    scheduleSn:number;
}

export function deleteSchedule(param:ScheduleSn):Promise<ApiResponse<boolean>>{
    console.log(param);
    return request({
        url: API_BASE  + "/schedule" ,
        method: DELETE,
        body: JSON.stringify(param)
    })
}