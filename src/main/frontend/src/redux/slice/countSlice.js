import {createSlice} from '@reduxjs/toolkit';

const initialStateValue= {
    count: 0,
};


export const countSlice = createSlice({
    name: "count",
    initialState: { value: initialStateValue},
    reducers: {
        increment: (state, action) => {
            state.value.count =state.value.count +1 ;
        },
        decrement: (state) => {
            state.value.count =state.value.count -1 ;
        },
        resetCount:(state)=>{
            state.value.count = initialStateValue.count;
        }
    },
});

export const { increment, decrement , resetCount } = countSlice.actions;

export default countSlice.reducer;