// auth.js

// LOGIN은 로그인 액션의 타입을 나타내는 상수입니다.
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

// login 함수는 사용자 정보를 인자로 받아서 LOGIN 액션을 생성합니다.
export const login2 = (user) => ({
    type: LOGIN,
    payload: user,
});

// logout 함수는 사용자 정보를 초기화 시킴.
export const logout2 = (user) => ({
    type: LOGOUT,
});

const initialState = {
    isLoggedIn: false,
    user: null,
};

// auth 함수는 state와 action을 받아서 새로운 상태를 반환합니다.
export default function authReducer(state = initialState, action) {
    switch (action.type) {
//LOGIN 액션이 발생하면 isLoggedIn을 true로 설정하고, 사용자 정보를 action.payload로 저장합니다.
        case LOGIN:
            const jwt = action.payload;
            let jwtData = jwt.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
            return {
                ...state,
                isLoggedIn: true,
                user: decodedJwtData,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}