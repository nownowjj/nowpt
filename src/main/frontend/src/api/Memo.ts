import {API_BASE, ApiResponse, DELETE, GET, POST, request} from "./Api";

interface MemoSnType {
    memoSn:number
}

export interface MemoResponseType extends MemoSnType{
    title?:string
    content:string
    memoSn:number
    membSn:number
    useYn:string
    frstRegistDt:Date
    lastRegistDt:Date
}

export interface MemoRequestType {
    title?:string
    content:string
    memoSn?:number
    useYn?:string
}

export function deleteMemo(param:MemoSnType):Promise<ApiResponse<MemoResponseType>>{
    console.log(param);
    return request({
        url: API_BASE  + "/memo" ,
        method: DELETE,
        body: JSON.stringify(param)
    })
}

export function selectMemo():Promise<ApiResponse<MemoResponseType[]>>{
    return request({
        url: API_BASE  + "/memo" ,
        method: GET,
        // body: JSON.stringify(param)
    })
}

export function insertMemo(param:MemoRequestType):Promise<ApiResponse<MemoResponseType>>{
    return request({
        url: API_BASE  + "/memo" ,
        method: POST,
        body: JSON.stringify(param)
    })
}

export function deleteAllMemo(param:number[]):Promise<ApiResponse<boolean>>{
    return request({
        url: API_BASE  + "/memo" ,
        method: DELETE,
        body: JSON.stringify(param)
    })
}