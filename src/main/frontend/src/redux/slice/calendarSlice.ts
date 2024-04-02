import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ScheduleDetailType} from "../../model/CalendarApiModel";

// import {ScheduleDetailType} from "../../pages/calendar/CalendarPage";

interface DayState {
    selectedDay:Date;
    yearHolidaysJson: ScheduleDetailType[];
    alreadyCallYear:string[];
}

const initialState:DayState = {
    selectedDay: new Date(),
    yearHolidaysJson: [],
    alreadyCallYear:[]
};


const calendarSlice = createSlice({
    name: "viewDay",
    initialState,

    reducers: {
        setDay: (state, action: PayloadAction<Date>) => {
            state.selectedDay = action.payload;
        },
        setYearHolidays: (state, action: PayloadAction<{ year: string, holidays: ScheduleDetailType[] }>) => {
            const { year, holidays } = action.payload;
            if (!state.alreadyCallYear.includes(year)) {
                if (holidays) {
                  state.yearHolidaysJson = state.yearHolidaysJson.concat(holidays);
                  state.alreadyCallYear.push(year);
                }
            }
        },
    },
});

export const { setDay,setYearHolidays } = calendarSlice.actions;

export default calendarSlice.reducer;