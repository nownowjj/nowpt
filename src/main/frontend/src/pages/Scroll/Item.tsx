// import { memo } from "react";
// import styled from "styled-components";
//
// const ItemWrap = styled.div`
//   .ItemWrap {
//     width: 350px;
//     height: 200px;
//     display: flex;
//     flex-direction: column;
//     background-color: #ffffff;
//     margin: 1rem;
//     box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//     border-radius: 6px;
//   }
//
//   .ItemWrap-Top {
//     display: flex;
//     width: 350px;
//     height: 20px;
//     border-top-left-radius: 6px;
//     border-top-right-radius: 6px;
//     background-color: #e2e5e7;
//     color: #566270;
//     font-size: 1.25rem;
//     justify-content: center;
//     text-align: center;
//     align-items: center;
//   }
//
//   .ItemWrap-Body {
//     height: 70px;
//     border-bottom-left-radius: 6px;
//     border-bottom-right-radius: 6px;
//     padding: 10px;
//   }
//
//   .ItemWrap-Body-Title {
//     width: 300px;
//     height: 36px;
//     margin: 16px;
//     border-radius: 4px;
//     background-color: #e2e5e7;
//   }
// `;
//
// const Item = ({ number, data }) => {
//     return (
//         <ItemWrap>
//             <div className="ItemWrap">
//                 <div className="ItemWrap-Top ">{number}</div>
//                 <div className="ItemWrap-Body">
//                     <div className="ItemWrap-Body-Title ">{data.data_one}</div>
//                     <div className="ItemWrap-Body-Title ">{data.data_two}</div>
//                     <div className="ItemWrap-Body-Title ">{data.data_three}</div>
//                 </div>
//             </div>
//         </ItemWrap>
//     );
// };
//
// export default memo(Item);