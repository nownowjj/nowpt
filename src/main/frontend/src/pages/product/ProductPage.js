import React, {useEffect, useState} from 'react';
import ProductComponent from "./ProductComponent";
import {selectAllProduct} from "../../api/ProductApi";


const ProductPage = () => {

    const [productList,setProductList] = useState([]);

    useEffect(()=>{
        selectAllProduct()
            .then(response => {
                console.log('상품 페이지 : %o',response);
                setProductList(response.data)
            }).catch(error =>{
            console.log(error)
        });
    },[])

    return (
        <div>
            {productList.map((product) => (<div key={product.productSn}> <ProductComponent data={product} /> </div> ) ) }
            {/*{productList.map((product) => (<div key={product.productSn}> <ProductLikeComponent data={product.productSn} /> </div> ) ) }*/}
        </div>
    );
};

export default ProductPage;