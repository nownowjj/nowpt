import {API_BASE, ApiResponse, GET, POST, request} from "./Api";
import {CommentDto, CommentParam} from "../model/CommentApiModel";


export function getComments(param:number):Promise<ApiResponse<CommentDto[]>>{
    return request({
        url: API_BASE + "/comment?calendarSn="+param ,
        method: GET
    })
}

export function insertComment(param:CommentParam):Promise<ApiResponse<CommentDto>>{
    return request({
        url: API_BASE  + "/comment" ,
        method: POST,
        body: JSON.stringify(param)
    })
}
