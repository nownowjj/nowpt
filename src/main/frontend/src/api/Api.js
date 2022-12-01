export const API_BASE = "http://localhost:8123/api";
// export const API_BASE = "/api";
export const ACCESS_TOKEN = 'accessToken';


const request = (options) => {
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


// 회원가입시 사용할 api
export function fetchTest() {
    return request({
        url: API_BASE + "/test",
        method: 'GET'
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