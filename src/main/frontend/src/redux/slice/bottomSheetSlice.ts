import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ScheduleDetailType} from "../../model/CalendarApiModel";


interface DayState {
    isDismiss:boolean;
}

const initialState:DayState = {
    isDismiss:true
};


const bottomSheetSlice = createSlice({
    name: "bottomSheet",
    initialState,

    reducers: {
        setInvisible: (state) => {
            state.isDismiss = true  ;
        },
        setVisible : (state) => {
            state.isDismiss = false  ;
        },
        startDown : ()=>{

        }
    },
});

export const { setInvisible, setVisible } = bottomSheetSlice.actions;

export default bottomSheetSlice.reducer;