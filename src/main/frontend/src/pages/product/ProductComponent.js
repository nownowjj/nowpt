import React, {useState} from 'react';
import styled from "styled-components";
import heart from "../../assets/heart.png";
import heart_active from "../../assets/heart-active.png";
import {likeEvent} from "../../api/ProductApi";
import UserEtt from "../../services/UserEtt";
import {useDispatch} from "react-redux";
import mgu from "../../assets/mgu.jpg";
import {productAction} from "../../redux/slice/productSlice";
import dayjs from "dayjs";
import {useNavigate} from "react-router";

const ProductComponent = ({data,likeCancleFn}) => {
    console.log(data);
    // ProductPage , ProductLikePage에서 "data"로 담은 상품 리스트
    const [product] = useState(data)
    // 좋아요 여부
    const [active,setActive] = useState(product.active);
    // 좋아요 개수
    const [count,setCount] = useState(product.likeCount);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userEtt = UserEtt();

    // default memberEmail = "" , 로그인을 했으면 email을 넘겨서 좋아요 여부를 가져옴
    const productLikeDto ={
        "productSn" : product.productSn,
        "memberEmail"  : userEtt.membEmail
    }

    // 좋아요 등록,취소
    const likeFunction =()=> {
        // 비로그인시 return
        if(!userEtt.isLogin) return false;
        // 좋아요 이미지 변경
        setActive(!active);
        // 좋아요 카운트 증가
        active === true ? setCount(count - 1) : setCount(count + 1);

        likeEvent(productLikeDto)
            .then(response =>{
                console.log('좋아요 등록 및 취소 %O' , response.data);
                // ProductLikePage에서 넘겨준 function 좋아요 페이지에서만 지원 => 좋아요 취소시 리렌더링
                if (likeCancleFn) {
                    likeCancleFn();
                }
            }).catch(error =>{
                console.log(error);
            })
    }

    return (
        <>
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


            <LikeImage onClick={likeFunction} style={{backgroundImage : `url(${active ? heart_active : heart})`}}/>
            <span>{count}</span>
            <hr/>
        </>
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
