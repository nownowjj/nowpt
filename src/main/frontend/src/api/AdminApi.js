import {API_BASE, request} from "./Api";

export function selectLoginStatistics() {
    return request({
        url: API_BASE + "/test/loginhst2",
        method: 'GET'
    });
}
