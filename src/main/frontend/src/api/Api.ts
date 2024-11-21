import {UserLoginInfo} from "../model/model";
import {HomeTestData} from "../pages/HomeComponent";
import {REDIRECT_URI} from "./OauthLoginUrl";

export const API_BASE = '/api';
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

type ApiCallFunction<T, P> = (param: P) => Promise<ApiResponse<T>>;

export function checkMethod(method?:string){
    const dim = window.document.getElementById('dim');
    if(method){
        if(dim) {
            console.log(`check method : ${method} 가려!!!`);
            dim.classList.add('dimOn');
        }
    }else{
        if(dim){
            console.log('지워@!@!@!@!@!@');
            dim.classList.remove('dimOn');
        }
    }
}

export const request = async <T>(options: ApiRequest): Promise<ApiResponse<T>> => {
    if(options.method !== GET) checkMethod(options.method);

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const token = localStorage.getItem(ACCESS_TOKEN);
    // @ts-ignore
    if (token) headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch(e => {
            console.log(e);
            // debugger;
            console.log('에러발생');


            if (e.code) {
                console.log(e);
                if (e.code === '4444') window.location.replace("/page/isExpired"); // {msg: '인증에 실패 하였습니다.', code: '4444', data: 'NOT-AUTH'}
            } else {
                window.location.replace("/isError");
            }
        }).finally(() => {
            if(options.method !== GET) checkMethod();
        });
};

/**
 * @param apiCallFunction  호출할 promise api function
 * @param param            넘길 param
 * @param delay            지연 발생 시간
 * @param callback         callback funciton return data
 * 공통 result.data get 함수
 */
export async function getData<T, P>(
        apiCallFunction: ApiCallFunction<T, P>,
        param?: P,
        delay: number=0 ,
        callback?: ((data: any) => void)
    ): Promise<T> {
    // @ts-ignore
    const result = await apiCallFunction(param)
    if(callback) callback(result.data)
    await new Promise(resolve => setTimeout(resolve, delay));
    apiFailCheck(apiCallFunction.name ,result)
    return result.data;
}

function apiFailCheck(apiCallFunctionName:string,result:any){
    if(result.status === "FAILURE") console.log(`[🔴${apiCallFunctionName}🔴] 요청 에러 발생 message : [🔴${result.message}🔴]`);
}


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
        url: API_BASE.replace("/api", "") + "/oauth/kakao?code=" + code +"&redirectUrl="+REDIRECT_URI,
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


// 프로필 이미지 변경
export function updateUserProfile(profileImg:string):Promise<ApiResponse<boolean>> {
    return request({
        url: API_BASE + "/common/profile",
        method: PUT,
        body: JSON.stringify({profileImg})
    });
}

// 프로필 이미지 변경
export function updateUserAutoProfile(yn:boolean):Promise<ApiResponse<boolean>> {
    return request({
        url: API_BASE + "/common/autoProfile",
        method: PUT,
        body: JSON.stringify({yn})
    });
}

// 프로필 이미지 변경
export function getUserProfile():Promise<ApiResponse<string>> {
    return request({
        url: API_BASE + "/common/profile",
        method: GET
    });
}

