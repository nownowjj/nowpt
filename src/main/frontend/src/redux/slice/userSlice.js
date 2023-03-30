import { createSlice } from '@reduxjs/toolkit';

const initialStateValue= {
    isLoggedIn: false,
    user: null,
};

// @Todo
// const jwt = action.payload;
// let jwtData = jwt.split('.')[1];
// let decodedJwtJsonData = window.atob(jwtData);
// let decodedJwtData = JSON.parse(decodedJwtJsonData);

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue},
    reducers: {
        login3: (state, action) => {
            state.value.user = action.payload ;
            state.value.isLoggedIn = true

        },
        logout: (state) => {
            state.value.user = initialStateValue
            state.value.isLoggedIn = false
        }
    },
});

export const { login3, logout } = userSlice.actions;

export default userSlice.reducer;