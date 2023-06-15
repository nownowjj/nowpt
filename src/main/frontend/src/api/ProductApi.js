import {API_BASE, request} from "./Api";

export const AUTH = "/admin";


//  추출
export function selectAllProduct(userEtt) {
    // console.log(userEtt);
    return request({
        url: API_BASE + "/auth/product",
        method: 'POST',
        body: JSON.stringify(userEtt)
    });
}

export function likeEvent(productLikeDto) {
    return request({
        url: API_BASE + "/auth/product/likeEvent",
        method: 'POST',
        body: JSON.stringify(productLikeDto)
    });
}


