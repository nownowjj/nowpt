import {API_BASE, request} from "./Api";

export function selectLoginStatistics(pageNumber) {
    return request({
        url: API_BASE + "/test/loginhst2?page="+pageNumber+
        "&size="+10,
        method: 'GET'
    });
}
