import {createSlice} from '@reduxjs/toolkit';

interface Product{
    likeCount:number;
    productSn:number;
    active:boolean;
    frstRegistMembSn:number;
    keepYn:string;
    lastChangeDt:Date;
    lastChangeMembSn:number;
    memberSn:number;
    productDiscountRate:number;
    productImage:string;
    productIntroduce:string;
    productNm:string;
    productPrice:number;
    remark:string;
    requestStatus:string;
    useYn:string;
    frstRegistDt:Date;
}

interface ProductType {
    product:Product|null
}

const initialStateValue:ProductType= {
    product: null,
};

export const productSlice = createSlice({
    name: "product",
    initialState: initialStateValue,
    reducers: {
        productAction: (state, action) => {
            console.log("==productAction==");
            state.product =action.payload;
        },
        resetProduct:(state)=>{
            state.product = initialStateValue.product;
        }
    },
});

export const { productAction } = productSlice.actions;

export default productSlice.reducer;