import {API_BASE, ApiResponse, request} from "./Api";
import {CommentDto} from "../model/CommentApiModel";


// {friendMemberSn:number}
export function getComments(param:number):Promise<ApiResponse<CommentDto[]>>{
    console.log();
    return request({
        url: API_BASE  + "/auth" + "/comment?calendarSn="+param ,
        method: 'GET'
    })
}
