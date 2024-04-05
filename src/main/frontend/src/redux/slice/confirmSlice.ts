import {createSlice} from '@reduxjs/toolkit';


interface ConfirmState {
    showConfirm:boolean;
    okCallBackFn:()=>void;
    message:string;
}

const initialState:ConfirmState = {
    showConfirm:false,
    okCallBackFn:()=>{},
    message:""
};


const confirmSlice = createSlice({
    name: "confirmSlice",
    initialState,

    reducers: {
        isShowConfirm: (state) => {
            state.showConfirm = true;
        },
        isNoShowConfirm:(state )=>{
            state.showConfirm = false;
        },
        setOkCallBackFn:(state,action )=>{
            console.log(action);
            state.okCallBackFn = action.payload;
        },
        setMessage: (state,action)=>{
            state.message = action.payload
        }
    },
});

export const { isShowConfirm,isNoShowConfirm,setOkCallBackFn,setMessage } = confirmSlice.actions;

export default confirmSlice.reducer;