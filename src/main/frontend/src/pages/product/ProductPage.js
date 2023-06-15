import React, {useEffect, useState} from 'react';
import {selectAllProduct} from "../../api/ProductApi";
import UserEtt from "../../services/UserEtt";
import ProductComponent from "./ProductComponent";


const ProductPage = () => {

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

    return (
        <div>
            {productList.map((product) => (<div key={product.productSn}> <ProductComponent data={product}/> </div> ) ) }
        </div>
    );
};

export default ProductPage;