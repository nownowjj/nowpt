import {UserLoginInfo} from "../model/model";
import {HomeTestData} from "../pages/HomeComponent";
import {isTokenExpiredFilter} from "./JwtDecode";

export const API_BASE = "http://localhost:8060/api";
export const ACCESS_TOKEN = 'accessToken';
export const NOTICE = "/notice";
export const RESERVATION = "/reservation";
export const COMMON = "/common";
export const PRODUCT = "/product";
export const CALENDAR = "/calendar";
export const NOTIFICATION = "/notification";
export const FRIEND = "/friend";

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";


export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export interface ApiRequest {
    url:string;
    method:string;
    body?:string;
}


export const request = <T>(options: ApiRequest) :Promise<ApiResponse<T>> => {
    const headers = new Headers({
        'Content-Type' : 'application/json',
    })

    const token = localStorage.getItem(ACCESS_TOKEN);
    // @ts-ignore
    if(token) headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))


    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch(e =>{
            console.log(e);
            console.log('에러발생');
            if(e.code){
                console.log(e);
                if(e.code === '4444') window.location.replace("/isExpired"); // {msg: '인증에 실패 하였습니다.', code: '4444', data: 'NOT-AUTH'}
            }else{
                window.location.replace("/isError");
            }
        });
};

export function homeTest():Promise<ApiResponse<HomeTestData>> {
    console.log("요청?");
    return request({
        url: API_BASE + "/auth/home",
        method: GET
    });
}
export function mainTest() {
    return request({
        url: API_BASE + "/auth/main",
        method: GET
    });
}

export function fetchTest() {
    return request({
        url: API_BASE + "/test/jpa",
        method: GET
    });
}
export function batisTest() {
    return request({
        url: API_BASE + "/test/batis",
        method: GET
    });
}
export function updateMembAddr(email:string) {
    console.log("param : " + email)
    return request({
        url: API_BASE + "/common/updateEmail/" + email,
        method: PUT
    });
}

// 로그인시 사용할 api
export function login(loginDto:UserLoginInfo):Promise<ApiResponse<LoginResponse>> {
    return request({
        url: API_BASE + "/auth/userLogin",
        method: POST,
        body: JSON.stringify(loginDto)
    });
}

// 카카오 로그인 api
export function kakaoLogin(code:string) {
    return request({
        url: API_BASE.replace("/api", "") + "/oauth/kakao?code=" + code,
        method: GET
    });
}

// 네이버 로그인 api
export function naverLogin(code:string,state:string) {
    return request({
        url: API_BASE.replace("/api", "") + "/oauth/naver?code=" + code + "&state=" + state,
        method: GET
    });
}




// 네이버 무비 검색 API
export function naverMovie(search:string) {
    return request({
        url: API_BASE + "/auth/movies/" + search,
        method: GET
    });
}
