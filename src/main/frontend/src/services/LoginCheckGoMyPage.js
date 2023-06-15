// import React, {useState} from 'react';
// import ConfirmComponent from "../component/ConfirmComponent";
//
// const LoginCheckGoMyPage = (isLogin) => {
//     console.log(isLogin);
//     console.log(`LoginCheckGoMyPage`);
//     console.log(`isLogin : ${isLogin}`);
//
//
//     const [show,setShow] = useState(false);
//     isLogin ? setShow(false) : setShow(true);
//
//     const rejectFunction=(props)=>{
//         console.log(props)
//         setShow(props);
//     }
//
//
//     // return (
//         // <div>
//         //       {show ?
//                 <ConfirmComponent
//                     confirmText={"로그인을 하셔야 이용할수 있습니다"}
//                     successText={"확인(로그인 페이지로)"}
//                     resolveFunction={"/"}
//                     rejectFunction={()=> rejectFunction} />
//                 // :
//                 // null
//               }
//         // </div>
//     // );
//
//
//
// };
//
// export default LoginCheckGoMyPage;