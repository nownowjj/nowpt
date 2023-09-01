import {createSlice} from '@reduxjs/toolkit';

interface CountState {
    count:number;
}

const initialStateValue:CountState = {
    count: 0,
};


const countSlice = createSlice({
    name: "count",
    initialState: initialStateValue,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= -1;
        },
        resetCount:(state)=>{
            state.count = initialStateValue.count;
        }
    },
});

export const { increment, decrement , resetCount } = countSlice.actions;

export default countSlice.reducer;