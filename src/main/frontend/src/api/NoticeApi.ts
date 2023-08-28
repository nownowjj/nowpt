import {API_BASE, NOTICE, request} from "./Api";
import {NoticeNew, NoticeSn} from "../model/NoticeApiModel";

export const ADMIN = "/admin";


//  추출
export function getNotice(pageNumber:number,pageSize:number){
    return request({
        url: API_BASE + NOTICE +
            "/auth/selectNotice?" +
            "page=" + pageNumber +
            "&size=" + pageSize,
        method: 'GET'
    })
}

export function insertNotice(noticeDto:NoticeNew) {
    return request({
        url: API_BASE + NOTICE + "/admin/insertNotice",
        method: 'POST',
        body: JSON.stringify(noticeDto)
    });
}


export function selectNoticeByNoticeSn(noticeSn:NoticeSn) {
    return request({
        url: API_BASE + NOTICE + "/admin/" + noticeSn,
        method: 'GET'
    });
}
export function updateNotice(noticeSn:NoticeSn,param:NoticeNew) {
    return request({
        url: API_BASE + NOTICE + "/admin/" + noticeSn,
        method: 'PUT',
        body: JSON.stringify(param)
    });
}


