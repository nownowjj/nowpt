import {createSlice} from '@reduxjs/toolkit';

const initialStateValue= {
    isLoggedIn: false,
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue},
    reducers: {
        login3: (state, action) => {
            let jwt = action.payload;
            let jwtData = jwt.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            state.value.user = JSON.parse(decodedJwtJsonData) ;
            state.value.isLoggedIn = true

        },
        logout3: (state) => {
            state.value.user = null;
            state.value.isLoggedIn = false
        }
    },
});

export const { login3, logout3 } = userSlice.actions;

export default userSlice.reducer;