import React, {useEffect, useState} from 'react';
import ProductComponent from "../../component/ProductComponent";
import {selectAllProduct} from "../../api/ProductApi";
import ProductLikeComponent from "./ProductLikeComponent";


const ProductPage = () => {

    const [productList,setProductList] = useState([]);

    useEffect(()=>{
        selectAllProduct()
            .then(response => {
                console.log(response);
                setProductList(response.data)
            }).catch(error =>{
            console.log(error)
        });
    },[])

    return (
        <div>
            {productList.map((product) => (<div key={product.productSn}> <ProductComponent data={product} /> </div> ) ) }
            {productList.map((product) => (<div key={product.productSn}> <ProductLikeComponent data={product.productSn} /> </div> ) ) }
        </div>
    );
};

export default ProductPage;