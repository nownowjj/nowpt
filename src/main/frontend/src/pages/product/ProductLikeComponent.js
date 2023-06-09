import React, {useState} from 'react';
import styled from "styled-components";
import heart from "../../assets/heart.png";
import heart_active from "../../assets/heart-active.png";
import {cancleLike, insertLike, likeEvent} from "../../api/ProductApi";
import {useSelector} from "react-redux";

const ProductLikeComponent = (data) => {

    const [active,setActive] = useState(data.active);
    const productLikeDto ={
        "productSn" : data.productSn,
        "memberEmail"  : useSelector((state) => state.user.value.user.membEmail)
    }


    const likeFunction =()=> {
        console.log(data);
        setActive(!active);
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
            <LikeImage onClick={likeFunction} style={{backgroundImage : `url(${img})`}}/>
    );
};

export default ProductLikeComponent;

const LikeImage = styled.div`
    width : 48px;
    background:center no-repeat;
    background-size: 24px; 
    height: 51px;
`
// const LikeImage = styled.div`
//     width :150px;
//     height:150px;
// `
