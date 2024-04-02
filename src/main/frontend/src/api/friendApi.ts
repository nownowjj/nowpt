import {API_BASE, ApiResponse, CALENDAR, FRIEND, request} from "./Api";
import {FriendMemberSn, FriendSn, FriendUpdateParam} from "../model/FriendApiModel";
import {friendDto} from "../pages/calendar/friend/FriendPage";
import {PagingResponse} from "../model/Common";
import {CalendarDto} from "../model/CalendarApiModel";


/**
 * @title 친구 요청을 보낸다
 * 1. 친구추천 목록에서 친구 요청을 보낸다.
 * 2. 대상자와 본인의 현재 관계를 조회한다.
 * 3. 관계가 존재 하지 않다면 요청을 보냄 [보낸 요청, 친구추천] 리렌더링  return[Alert:친구요청 성공!]
 * 4. 관계가 이미 존재 한다면 분기처리를 해야한다.
 * 5. WAIT -> 내가 요청을 보내기 전에 대상자가 이미 본인에게 친구 요청을 보낸 것이다. 요청을 보내지 않고 [받은 요청 , 친구추천] 목록 리렌더링 return[Alert:받은 목록을 확인해 주세요!]
 * 6. 해당 케이스 외에는 예외가 없다고 판단됨
 */
// {friendMemberSn:number}
export function requestFriend(param:FriendMemberSn):Promise<ApiResponse<string>>{
    return request({
        url: API_BASE  + FRIEND + "/apply",
        method: 'POST',
        body: JSON.stringify(param)
    })
}


/**
 * @title 친구 요청 수락 or 거절
 */
export function updateRequestFriend(param:FriendUpdateParam):Promise<ApiResponse<string>>{
    return request({
        url: API_BASE  + FRIEND + "/apply",
        method: 'PUT',
        body: JSON.stringify(param)
    })
}

//
export function getMyApplyWaitFriend():Promise<ApiResponse<friendDto[]>>{
    const url = API_BASE + FRIEND +"/apply";
    return request({
        url: url,
        method: 'GET'
    });
}

// 보낸 요청 리스트
export function getRequestWaitFriend(): Promise<ApiResponse<friendDto[]>> {
    const url = API_BASE  + FRIEND + "/requestWait";
    return request({
        url: url,
        method: 'GET'
    });
}

// 친구 추천 리스트
export function getRecommendFriend():Promise<ApiResponse<friendDto[]>>{
    const url = API_BASE  + FRIEND;
    return request({
        url: url,
        method: 'GET'
    });
}


// 내 친구 조회
export function getMyFriend():Promise<ApiResponse<friendDto[]>>{
    const url = API_BASE  + FRIEND + "/myFriend";
    return request({
        url: url,
        method: 'GET'
    });
}


/**
 * @validate 내가 보낸 요청을 취소 해야 한다.
 * 1. friendSn 상태 조회 -> api 요청시에 WAIT 상태인지 확인 해야 함
 * 2. WAIT 상태면 friendSn use_yn(N) -> 요청을 받은 상대는 Notification 전송 되었지만 수락 대기중인 목록에는 조회되지 않는다.
 * 3. WAIT 아니라면 REFUSE 이거나 ACCEPT 상태이다
 * 4. REFUSE 상태라면 상대방이 요청을 거절한 것이므로 그대로 N으로 꺾는다.
 * 5. ACCEPT 상태라면 상대방이 요청을 수락한 상태이므로 Alert을 띄어준 후 [친구 목록 , 요청 대기] 리렌더링 해야 함
 * @param param:friendSn
 */
export function cancelFriendRequestApi(param:FriendSn):Promise<ApiResponse<string>>{
    return request({
        url: API_BASE + FRIEND +"/cancel" ,
        method:'PUT',
        body:JSON.stringify(param)
    })
}

/**
 * 친구삭제
 */
export function deleteFriendApi(param:{friendMemberSn: number }):Promise<ApiResponse<string>>{
    return request({
        url: API_BASE + FRIEND +"/cancel" ,
        method:'DELETE',
        body:JSON.stringify(param)
    })
}


export function getMyFriendCalendar(param:number ,pageNumber:number):Promise<ApiResponse<PagingResponse<CalendarDto[]>>>{
    const url = API_BASE + FRIEND + CALENDAR;
    const fullUrl = url + "?" +"memberSn="+param +"&page="+pageNumber+"&size="+10;
    return request({
        url: fullUrl,
        method: 'GET'
    })
}





