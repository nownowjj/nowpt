import {API_BASE, COMMON, request, RESERVATION} from "./Api";

export function insertReservation(reservationDto){
    return request({
        url: API_BASE +COMMON+ RESERVATION + "/insertReservation",
        method: 'POST',
        body: JSON.stringify(reservationDto)
    })
}

export function getReservation(paramStart,paramEnd,room){
    return request({
        url: API_BASE + COMMON +RESERVATION +
            "/selectPagingReservation?startDay=" + paramStart +
            "&endDay=" + paramEnd +
            "&room=" + room ,
        method: 'GET'
    })
}

export function selectReservationByReservationSn(reservationSn) {
    return request({
        url: API_BASE +COMMON+ RESERVATION +"/"+ reservationSn,
        method: 'GET'
        // body: JSON.stringify(noticeDto)
    });
}