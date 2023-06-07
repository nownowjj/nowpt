import {API_BASE, request} from "./Api";

export const AUTH = "/admin";


//  추출
export function selectAllProduct() {
    return request({
        url: API_BASE + "/auth/product",
        method: 'GET'
        // body: JSON.stringify(noticeDto)
    });
}

