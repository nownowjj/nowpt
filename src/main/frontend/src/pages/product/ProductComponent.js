import React, {useState} from 'react';
import styled from "styled-components";
import heart from "../../assets/heart.png";
import heart_active from "../../assets/heart-active.png";
import {likeEvent} from "../../api/ProductApi";
import UserEtt from "../../services/UserEtt";
import {useDispatch, useSelector} from "react-redux";
import mgu from "../../assets/mgu.jpg";
import {productAction} from "../../redux/slice/productSlice";
import dayjs from "dayjs";
import {useNavigate} from "react-router";

const ProductComponent = (data) => {
    console.log(data);
    const [product] = useState(data.data)
    const [active,setActive] = useState(product.active);
    const [count,setCount] = useState(product.likeCount);

    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.user.value.isLoggedIn);
    const navigate = useNavigate();
    let userEtt = UserEtt();

    const productLikeDto ={
        "productSn" : product.productSn,
        "memberEmail"  : userEtt.membEmail
    }


    const likeFunction =()=> {
        if(!isLogin) return false;

        console.log(`상태 ${active}를 ${!active}로 `);
        setActive(!active);

        // 좋아요 카운트 증가
        active === true ? setCount(count - 1) : setCount(count + 1);

        likeEvent(productLikeDto)
            .then(response =>{
                console.log(response);
            }).catch(error =>{
                console.log(error);
            })
    }
    let img = active ? heart_active : heart ;

    // { background: url("/assets/web/images/ico/btn-lent-heart@3x.png") left center no-repeat; background-size: 24px; padding-left: 32px; margin-right: 12px; }
// .active { background: url("/assets/web/images/ico/btn-lent-heart-active@3x.png") left center no-repeat; background-size: 24px; }
    return (
        <div>
            <div>{product.productSn}</div>

            <ProductImageWrap>
                <ProductImage src=
                                  {product.productImage != null ? product.productImage : mgu } alt={'상품 이미지'}
                              onClick={()=> {
                                  dispatch(productAction(product));
                                  navigate('/go/product/'+ product.productSn);
                              }}
                >
                </ProductImage>
            </ProductImageWrap>

            <div>상품명 : {product.productNm}</div>
            <div>상품소개 : {product.productIntroduce}</div>
            <div>상품가격 : {product.productPrice}원</div>
            <div>할인율 :  {product.productDiscountRate}% ,  할인 가격 : {product.productPrice  *(product.productDiscountRate/100)}원</div>
            <div>상품 등록일 : {(dayjs(product.frstRegistDt).format('YYYY년MM월DD일 hh시mm분 A'))}</div>
            <div>할인 적용 가격 :  {product.productPrice - (product.productPrice  *(product.productDiscountRate/100))}원</div>


            <LikeImage onClick={likeFunction} style={{backgroundImage : `url(${img})`}}/>
            <span>{count}</span>
            <hr/>
        </div>
    );
};

export default ProductComponent;

const LikeImage = styled.div`
    width : 48px;
    background:center no-repeat;
    background-size: 24px; 
    height: 51px;
`
const ProductImage = styled.img`
    width : 100%;
    height: 100%;
`
const ProductImageWrap = styled.div`
    width :150px;
    height:150px;
`
