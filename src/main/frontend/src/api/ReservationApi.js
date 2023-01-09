import {API_BASE, COMMON, NOTICE, request, RESERVATION} from "./Api";

export function insertReservation(reservationDto){
    return request({
        url: API_BASE +COMMON+ RESERVATION + "/insertReservation",
        method: 'POST',
        body: JSON.stringify(reservationDto)
    })
}

export function getReservation(){
    return request({
        url: API_BASE + COMMON +RESERVATION + "/selectPagingReservation",
        method: 'GET'
    })
}