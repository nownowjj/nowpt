import {createSlice} from '@reduxjs/toolkit';

const initialStateValue= {
    product: null,
};

export const productSlice = createSlice({
    name: "product",
    initialState: { value: initialStateValue},
    reducers: {
        productAction: (state, action) => {
            console.log("==productAction==");
            state.value.product =action.payload;
        },
        resetProduct:(state)=>{
            state.product = initialStateValue.product;
        }
    },
});

export const { productAction } = productSlice.actions;

export default productSlice.reducer;