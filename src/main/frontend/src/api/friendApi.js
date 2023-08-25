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

/**
 * @param friendMemberSn (요청을 받는 사람의 Sn)
 * @title 친구 요청을 보낸다
 * @order
 * 1. 친구추천 목록에서 친구 요청을 보낸다.
 * 2. 대상자와 본인의 현재 관계를 조회한다.
 * 3. 관계가 존재 하지 않다면 요청을 보냄 [보낸 요청, 친구추천] 리렌더링  return[Alert:친구요청 성공!]
 * 4. 관계가 이미 존재 한다면 분기처리를 해야한다.
 * 5. WAIT -> 내가 요청을 보내기 전에 대상자가 이미 본인에게 친구 요청을 보낸 것이다. 요청을 보내지 않고 [받은 요청 , 친구추천] 목록 리렌더링 return[Alert:받은 목록을 확인해 주세요!]
 * 6. 해당 케이스 외에는 예외가 없다고 판단됨
 */
export function requestFriend(param){
    return request({
        url: API_BASE + "/auth"+ FRIEND +"/apply" ,
        method:'POST',
        body:JSON.stringify(param)
    })
}

/**
 * @param friendSn
 * @title 보낸 친구 요청을 취소한다
 * @order
 * 1. 
 */
export function cancelFriendRequestApi(param){
    return request({
        url: API_BASE + "/auth"+ FRIEND +"/apply" ,
        method:'PUT',
        body:JSON.stringify(param)
    })
}



