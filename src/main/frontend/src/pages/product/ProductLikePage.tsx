// import React, {useEffect, useState} from 'react';
// import {selectProductLikeList} from "../../api/ProductApi";
// import ProductComponent from "./ProductComponent";
//
// const ProductLikePage = () => {
//     // 좋아요한 상품을 담을 Object
//     const [productLikeList , setProductLikeList] = useState([]);
//     // 좋아요 취소시 리렌더링을 발생시킬 상태값
//     const [likeCancle , setLikeCancle] = useState(0);
//
//
//     useEffect(()=>{
//         selectProductLikeList()
//             .then(response =>{
//                 console.log('좋아요 리스트 : %O' , response.data);
//                 setProductLikeList(response.data);
//             }).catch(error =>{
//                 console.log(error);
//         })
//     },[likeCancle])
//
//
//     const likeCancleFn = ()=>{
//         console.log('좋아요 취소 발생 리렌더');
//         setProductLikeList([]);
//         setLikeCancle(likeCancle + 1);
//     }
//
//     return (
//         <div>
//             {productLikeList
//                 ?
//                 productLikeList.map((product) => (<div key={product.productSn}> <ProductComponent
//                    likeCancleFn={likeCancleFn} myPage={true} data={product}
//                 /> </div> ) )
//                 :
//                 '텅~!~!'
//             }
//         </div>
//     );
// };
//
// export default ProductLikePage;