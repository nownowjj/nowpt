import React from 'react';
import dayjs from "dayjs";
import styled from "styled-components";
import mgu from "../assets/mgu.jpg";
import {productAction} from "../redux/slice/productSlice";

const ProductLikeComponent = (productSn) => {
    console.log(productSn);
// 필요 => 상품Sn = prop , 유저Sn = redux

    // { background: url("/assets/web/images/ico/btn-lent-heart@3x.png") left center no-repeat; background-size: 24px; padding-left: 32px; margin-right: 12px; }
// .active { background: url("/assets/web/images/ico/btn-lent-heart-active@3x.png") left center no-repeat; background-size: 24px; }
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


                <div>{(dayjs(product.data.frstRegistDt).format('YYYY년MM월DD일 hh시mm분 A'))}</div>
                {/*<td><Button onClick={() => {noticeUpdate(list.noticeSn)}} value="수정"/></td>*/}
                <hr/>
            </div>
        </div>
    );
};

export default ProductLikeComponent;

const ProductImage = styled.img`
    width : 100%;
    height: 100%;
`
const ProductImageWrap = styled.div`
    width :150px;
    height:150px;
`
