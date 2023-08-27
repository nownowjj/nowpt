import {API_BASE, COMMON, request, RESERVATION} from "./Api";

interface ReservationDto{

}

export function insertReservation(reservationDto:ReservationDto){
    return request({
        url: API_BASE +COMMON+ RESERVATION + "/insertReservation",
        method: 'POST',
        body: JSON.stringify(reservationDto)
    })
}


export function getReservation(paramStart:string,paramEnd:string,room:string){
    return request({
        url: API_BASE + COMMON +RESERVATION +
            "/selectPagingReservation?startDay=" + paramStart +
            "&endDay=" + paramEnd +
            "&room=" + room ,
        method: 'GET'
    })
}

export function selectReservationByReservationSn(reservationSn:number) {
    return request({
        url: API_BASE +COMMON+ RESERVATION +"/"+ reservationSn,
        method: 'GET'
        // body: JSON.stringify(noticeDto)
    });
}