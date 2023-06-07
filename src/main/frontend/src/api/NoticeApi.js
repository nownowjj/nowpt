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


export function selectNoticeByNoticeSn(noticeSn) {
    return request({
        url: API_BASE + NOTICE + "/admin/"+noticeSn,
        method: 'GET'
        // body: JSON.stringify(noticeDto)
    });
}
export function updateNotice(noticeSn,param) {
// export function updateNotice(noticeSn,noticeDto) {
    return request({
        url: API_BASE + NOTICE + "/admin/"+noticeSn,
        method: 'PUT',
        body: JSON.stringify(param)
    });
}


