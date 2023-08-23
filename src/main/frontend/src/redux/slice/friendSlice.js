import {createSlice} from "@reduxjs/toolkit";


const initialState ={
    firstCount : 0,
    secondCount : 0,
};

export const friendSlice = createSlice({
    name: "friendCount",
    initialState ,
    reducers:{
        firstEvent:(state, action)=>{
            console.log("firstEvent");
            state.firstCount += 1;
        }
        // ,
        // secondEvent:(state, action)=>{
        //     state.secondCount += 1;
        // }
    },
});

export const {firstEvent } = friendSlice.actions;

export default friendSlice.reducer;