import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DayState {
    selectedDay:Date;
}

const initialState:DayState = {
    selectedDay: new Date
};


const calendarSlice = createSlice({
    name: "viewDay",
    initialState,

    reducers: {
        setDay: (state, action: PayloadAction<Date>) => {
            state.selectedDay = action.payload;
        },
    },
});

export const { setDay } = calendarSlice.actions;

export default calendarSlice.reducer;