import React from 'react';
import {useNavigate} from "react-router";
import dayjs from "dayjs";
import styled from "styled-components";
import mgu from "../../assets/mgu.jpg";
import {useDispatch} from "react-redux";
import {productAction} from "../../redux/slice/productSlice";
import ProductLikeComponent from "./ProductLikeComponent";

const ProductComponent = (product) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();




    return (
        <div>
                    <div >
                        <div>{product.data.productSn}</div>

                        <ProductImageWrap>
                            <ProductImage src=
                              {product.data.productImage != null ? product.data.productImage : mgu } alt={'상품 이미지'}
                              onClick={()=> {
                                  dispatch(productAction(product));
                                  navigate('/go/product/'+ product.data.productSn)
                                  }}
                            >
                            </ProductImage>
                        </ProductImageWrap>

                        <div>{product.data.productNm}</div>
                        <div>{product.data.productIntroduce}</div>
                        <div>{product.data.productPrice}</div>
                        <div>{product.data.productDiscountRate}</div>
                        <div>{(dayjs(product.data.frstRegistDt).format('YYYY년MM월DD일 hh시mm분 A'))}</div>

                        <ProductLikeComponent likeCount={product.data.likeCount} active={product.data.active} productSn={product.data.productSn}/>
                        <hr/>
                    </div>
        </div>
    );
};

export default ProductComponent;

const ProductImage = styled.img`
    width : 100%;
    height: 100%;
`
const ProductImageWrap = styled.div`
    width :150px;
    height:150px;
`
