import {createSlice} from '@reduxjs/toolkit';


interface ConfirmState {
    showConfirm:boolean;
    okCallBackFn:()=>void;
    message:string;
    cancelBtnShow:boolean;
}

const initialState:ConfirmState = {
    showConfirm:false,
    okCallBackFn:()=>{},
    message:"",
    cancelBtnShow:true
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
        },
        isShowCancelBtn: (state) => {
            state.cancelBtnShow = true;
        },
        isNoShowCancelBtn:(state )=>{
            state.cancelBtnShow = false;
        },
    },
});

export const {isShowCancelBtn,isNoShowCancelBtn, isShowConfirm,isNoShowConfirm,setOkCallBackFn,setMessage } = confirmSlice.actions;

export default confirmSlice.reducer;