import {API_BASE, FRIEND, request} from "./Api";

export function getMyApplyWaitFriend(){
    const url = API_BASE +"/auth" + FRIEND +"/apply";
    return request({
        url: url,
        method: 'GET'
    });
}

export function getRequestWaitFriend(){
    const url = API_BASE +"/auth" + FRIEND +"/requestWait";
    return request({
        url: url,
        method: 'GET'
    });
}

export function getRecommendFriend(){
    const url = API_BASE +"/auth" + FRIEND;
    return request({
        url: url,
        method: 'GET'
    });
}

export function requestFriend(param){
    return request({
        url: API_BASE + "/auth"+ FRIEND +"/apply" ,
        method:'POST',
        body:JSON.stringify(param)
    })
}
export function updateRequestFriend(param){
    return request({
        url: API_BASE + "/auth"+ FRIEND +"/apply" ,
        method:'PUT',
        body:JSON.stringify(param)
    })
}
export function getMyFriend(){
    const url = API_BASE +"/auth" + FRIEND + "/myFriend";
    return request({
        url: url,
        method: 'GET'
    });
}

