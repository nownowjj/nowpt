import {API_BASE, NOTICE, request} from "./Api";

export const ADMIN = "/admin";


//  추출
export function getNotice(){
    return request({
        url: API_BASE + NOTICE + "/auth/selectNotice",
        method:'GET'
    })
}