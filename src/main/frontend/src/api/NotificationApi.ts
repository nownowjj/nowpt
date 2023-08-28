import {API_BASE, NOTIFICATION, request} from "./Api";
import {NotificationSn} from "../model/NotificationApiModel";

export function getMyNotification(pageNumber:number, countMode=false){
    const url = API_BASE + NOTIFICATION;
    const param = "?page="+pageNumber+"&size=10&countMode="+countMode
    const requestUrl = url+ param
    console.log("countMode",countMode);
    return request({
        url: requestUrl,
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




