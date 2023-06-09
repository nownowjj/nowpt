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

export function likeEvent(productLikeDto) {
    return request({
        url: API_BASE + "/auth/product/likeEvent",
        method: 'POST',
        body: JSON.stringify(productLikeDto)
    });
}


