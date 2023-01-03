import {API_BASE, NOTICE, request} from "./Api";

export const ADMIN = "/admin";


//  추출
export function getNotice(pageNumber,pageSize){
    return request({
        url: API_BASE + NOTICE +
            "/auth/selectNotice?" +
            "page="+pageNumber+
            "&size="+pageSize,
        method:'GET'
    })
}

export function insertNotice(noticeDto) {
    return request({
        url: API_BASE + NOTICE + "/admin/insertNotice",
        method: 'POST',
        body: JSON.stringify(noticeDto)
    });
}

