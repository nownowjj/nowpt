import React, {useEffect, useState} from 'react';
import {selectAllProduct} from "../../api/ProductApi";
import UserEtt from "../../services/UserEtt";
import ProductComponent from "./ProductComponent";
import {useNavigate} from "react-router-dom";


const ProductPage = () => {
    const navigate = useNavigate();
    const [productList,setProductList] = useState([]);

    let userEtt = UserEtt();
    // console.log(userEtt);

    useEffect(()=>{
        selectAllProduct(userEtt)
            .then(response => {
                console.log('상품 페이지 : %o',response);
                setProductList(response.data)
            }).catch(error =>{
            console.log(error)
        });
    },[])

    const LikeProductFn =()=> {
        navigate("/go/productLike");
    }


    return (
        <div>
            <div onClick={()=> LikeProductFn()}>찜한 상품 보러가기</div> <hr/>
            {productList.map((product) => (<div key={product.productSn}> <ProductComponent data={product}/> </div> ) ) }
        </div>
    );
};

export default ProductPage;