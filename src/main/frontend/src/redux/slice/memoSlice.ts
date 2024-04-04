import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface MemoState {
    deleteSnLists:number[]
    memoSize:number
}

const initialState:MemoState = {
    deleteSnLists:[],
    memoSize:0,
};


const memoSlice = createSlice({
    name: "memoSnLists",
    initialState,

    reducers: {
        setMemoLists: (state,action:PayloadAction<number[]>) => {
            state.deleteSnLists = action.payload;
        },
        setMemoSize:(state , action)=>{
            state.memoSize = action.payload
        }
    },
});

export const { setMemoLists,setMemoSize } = memoSlice.actions;

export default memoSlice.reducer;