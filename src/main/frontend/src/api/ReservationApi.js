import {API_BASE, COMMON, request, RESERVATION} from "./Api";

export function insertReservation(reservationDto){
    return request({
        url: API_BASE +COMMON+ RESERVATION + "/insertReservation",
        method:'POST',
        body: JSON.stringify(reservationDto)
    })
}