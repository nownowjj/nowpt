import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface Coordinate {
    lat: string;
    lng: string;
}

interface MapState {
    coordinate: Coordinate;
}

const initialState: MapState = {
    coordinate: {
        lat: '',
        lng: ''
    }
};

const mapSlice = createSlice({
    name: "map",
    initialState,

    reducers: {
        setCoordinate: (state,action:PayloadAction<Coordinate>) => {
            state.coordinate = action.payload;
        }
    },
});

export const { setCoordinate } = mapSlice.actions;

export default mapSlice.reducer;