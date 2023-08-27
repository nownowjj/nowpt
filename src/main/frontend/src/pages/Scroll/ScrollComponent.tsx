// import React, {useEffect, useState} from "react";
// import {selectLoginStatistics} from "../../api/AdminApi";
// import {useInView} from "react-intersection-observer";
// import Item from "./Item";
// import styled from "styled-components";
// import ApiErrorHandle from "../../services/ApiErrorHandle";
//
// const ScrollComponent = () => {
//     const [ref, inView] = useInView();
//     const [loginList,setLoginList] = useState([]);
//     const[pageNumber,setPageNumber] = useState(0);
//     const[last,setLast] = useState(false);
//
//     useEffect(() => {
//         selectLoginStatistics(pageNumber)
//             .then(response => {
//                 console.log(pageNumber + " response %O :" , response.data);
//                 if(!response.data || response.data.content.numberOfElements < 10) {
//                     console.log("마지막 페이지 입니다만");
//                     setLast(true);
//                     return;
//                 }
//                 setLoginList((itemLists) => itemLists.concat(response.data.content));
//             }).catch(error => {
//             ApiErrorHandle(error)
//         });
//     }, [pageNumber]);
//
//
//
//     useEffect(()=>{
//         if(loginList.length !==0 && inView) {
//             console.log('첫 로딩 이후 무한 스크롤');
//             if (last) return;
//             setPageNumber(pageNumber + 1)
//         }
//     },[inView,loginList]);
//
//
//     return (
//         <ScrollWrap>
//             {loginList.map((item,index) => (
//                 <Item key={index} number={index + 1} data={item} />
//             ))}
//             <ObserverArea ref={ref} />
//         </ScrollWrap>
//     );
// };
//
// const ScrollWrap = styled.div`
//     height:100%;
// `
//
// const ObserverArea = styled.div`
//     border-bottom:1px solid #e8e8e8;
// `
//
// export default ScrollComponent;