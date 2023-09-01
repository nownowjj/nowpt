import {createSlice} from "@reduxjs/toolkit";

interface FriendState{
    firstCount : number;
    secondCount : number;
}

const initialState:FriendState ={
    firstCount : 0,
    secondCount : 0,
};

const friendSlice = createSlice({
    name: "friendCount",
    initialState ,
    reducers:{
        firstEvent:(state)=>{
            state.firstCount += 1;
        }
        ,
        secondEvent:(state)=>{
            state.secondCount += 1;
        }
    },
});

export const {firstEvent } = friendSlice.actions;

export default friendSlice.reducer;