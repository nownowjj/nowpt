import {createSlice} from '@reduxjs/toolkit';
import {ACCESS_TOKEN} from "../../api/Api";

export interface UserInterface  {
    membEmail: string;
    membPw: string;
    roles: string;
    membId: string;
    profileImage: string;
    exp: number;
    iat: number;
    membSn:number;
}

export interface UserState {
    isLoggedIn: boolean;
    user: UserInterface | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action) => {
            let jwt = action.payload;
            let jwtData = jwt.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            state.user = JSON.parse(decodedJwtJsonData) ;
            state.isLoggedIn = true
        },
        logoutAction: (state=initialState) => {
            localStorage.removeItem(ACCESS_TOKEN)
            state.user = null;
            state.isLoggedIn = false
        }
    },
});

export const { loginAction, logoutAction } = userSlice.actions;

 export default userSlice.reducer;