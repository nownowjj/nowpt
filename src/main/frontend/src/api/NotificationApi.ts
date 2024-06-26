import {API_BASE, ApiResponse, NOTIFICATION, request} from "./Api";
import {NotificationDto, NotificationSn} from "../model/NotificationApiModel";
import {PagingResponse} from "../model/Common";

export function getMyNotification(pageNumber:number):Promise<ApiResponse<PagingResponse<NotificationDto[]>>>{
    const url = API_BASE + NOTIFICATION;
    const param = "?page="+pageNumber+"&size=10"
    const requestUrl = url+ param
    return request({
        url: requestUrl,
        method: 'GET'
    });
}

export function getMyNotificationCount():Promise<ApiResponse<number>>{
    const url = API_BASE + NOTIFICATION+"/count";
    return request({
        url: url,
        method: 'GET'
    });
}

export function deleteAllNotification(){
    return request({
        url: API_BASE + NOTIFICATION,
        method: 'DELETE'
    })
}

export function updateNotification(param:NotificationSn){
    return request({
        url: API_BASE + NOTIFICATION,
        method: 'PUT',
        body: JSON.stringify(param)
    })
}




