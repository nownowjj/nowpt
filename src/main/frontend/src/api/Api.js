export const API_BASE = "http://localhost:3000/api";
export const ACCESS_TOKEN = 'accessToken';
export const NOTICE = "/notice";
export const RESERVATION = "/reservation";
export const COMMON = "/common";





export const request = (options) => {
    const headers = new Headers({
        'Content-Type' : 'application/json',
    })

    if(sessionStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN))
    }

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
        );
};

//  추출
export function getMembInfo(){
    return request({
        url:API_BASE+"/common/getMembInfo",
        method:'GET'
    })
}
//
export function homeTest() {
    return request({
        url: API_BASE + "/auth/home",
        method: 'GET'
    });
}
export function mainTest() {
    return request({
        url: API_BASE + "/auth/main",
        method: 'GET'
    });
}

export function fetchTest() {
    return request({
        url: API_BASE + "/test/jpa",
        method: 'GET'
    });
}
export function batisTest() {
    return request({
        url: API_BASE + "/test/batis",
        method: 'GET'
    });
}
export function updateMembAddr(email) {
    console.log("param : " + email)
    return request({
        url: API_BASE + "/common/updateEmail/" + email,
        method: 'PUT'
    });
}

// 로그인시 사용할 api
export function login(loginDto) {
    return request({
        url: API_BASE + "/auth/userLogin",
        method: 'POST',
        body: JSON.stringify(loginDto)
    });
}

// 카카오 로그인 api
export function kakaoLogin(code) {
    return request({
        url: API_BASE.replace("/api","") + "/oauth/kakao?code="+code,
        method: 'GET'
    });
}

// 네이버 로그인 api
export function naverLogin(code,state) {
    return request({
        url: API_BASE.replace("/api","") + "/oauth/naver?code="+code+"&state="+state,
        method: 'GET'
    });
}




// 네이버 무비 검색 API
export function naverMovie(search) {
    return request({
        url: API_BASE + "/auth/movies/"+search,
        method: 'GET'
    });
}