import React, {useEffect, useState} from 'react';
import ProductComponent from "./ProductComponent";
import {selectAllProduct} from "../../api/ProductApi";
import {useParams} from "react-router-dom";
import mgu from "../../assets/mgu.jpg";
import {productAction} from "../../redux/slice/productSlice";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import styled from "styled-components";


const ProductDetailComponent = () => {
    const {productSn} = useParams();
    let product = useSelector((state) => state.product.value.product);
    console.log('상품  상세 ');
    console.log(useSelector((state) => state.product.value));



    return (
        <div>
            <div >
                <div>{product.productSn}</div>

                <ProductImageWrap>
                    <ProductImage src=
                          {product.productImage != null ? product.productImage : mgu } alt={'상품 이미지'}>
                    </ProductImage>
                </ProductImageWrap>

                <div>{product.productNm}</div>
                <div>{product.productIntroduce}</div>
                <div>{product.productPrice}</div>
                <div>{product.productDiscountRate}</div>
                <div>{(dayjs(product.frstRegistDt).format('YYYY년MM월DD일 hh시mm분 A'))}</div>
                {/*<td><Button onClick={() => {noticeUpdate(list.noticeSn)}} value="수정"/></td>*/}
                <hr/>
            </div>
        </div>
    );
};

export default ProductDetailComponent;

const ProductImage = styled.img`
    width : 100%;
    height: 100%;
`
const ProductImageWrap = styled.div`
    width :150px;
    height:150px;
`