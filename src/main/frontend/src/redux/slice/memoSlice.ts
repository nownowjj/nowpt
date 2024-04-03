import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface MemoState {
    deleteSnLists:number[]
}

const initialState:MemoState = {
    deleteSnLists:[]
};


const memoSlice = createSlice({
    name: "memoSnLists",
    initialState,

    reducers: {
        setMemoLists: (state,action:PayloadAction<number[]>) => {
            state.deleteSnLists = action.payload;
        },
    },
});

export const { setMemoLists, } = memoSlice.actions;

export default memoSlice.reducer;