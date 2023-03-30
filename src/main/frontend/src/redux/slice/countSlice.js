import {createSlice} from '@reduxjs/toolkit';

const initialStateValue= {
    count: 0,
};


export const countSlice = createSlice({
    name: "count",
    initialState: { value: initialStateValue},
    reducers: {
        increment: (state, action) => {
            console.log(state,action);
            state.value.count =state.value.count +1 ;
        },
        decrement: (state) => {
            state.value.count =state.value.count -1 ;
        }
    },
});

export const { increment, decrement } = countSlice.actions;

export default countSlice.reducer;