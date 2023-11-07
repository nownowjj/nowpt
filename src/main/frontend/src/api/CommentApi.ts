import {API_BASE, ApiResponse, request} from "./Api";
import {CommentDto, CommentParam} from "../model/CommentApiModel";


export function getComments(param:number):Promise<ApiResponse<CommentDto[]>>{
    console.log();
    return request({
        url: API_BASE  + "/auth" + "/comment?calendarSn="+param ,
        method: 'GET'
    })
}

export function insertComment(param:CommentParam):Promise<ApiResponse<CommentDto>>{
    return request({
        url: API_BASE  + "/auth" + "/comment" ,
        method: 'POST',
        body: JSON.stringify(param)
    })
}
