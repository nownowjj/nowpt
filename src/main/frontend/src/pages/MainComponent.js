import React, {useEffect, useState} from "react";
import {mainTest} from "../api/Api";
import Kakaomap from "../services/kakaomap/Kakaomap";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../redux/slice/countSlice";
import isId from "../services/authService/IsId";

const MainComponent = () => {
    const dispatch = useDispatch();


    const [message,setMessage] = useState("");

    const count = useSelector(state => state.count.value.count);
    const isLoggedIn = useSelector((state) => state.user.value.isLoggedIn);
    // const user = useSelector((state) => state.user.value.user);
    const id = isId();

    useEffect(()=>{
        mainTest()
            .then(response => {
                    setMessage(response.message)
            }).catch(error =>{
            console.log(error)
        });
    },[])



    const checkFn = (text,e) =>{
        console.log(text,e)
    }
    
    
    
    return (
        <div>
            <div
                onClick={(event) => checkFn("응애",event)}>
                ==
            </div>
            <br/>
            api : {message}, 홈,메인은 로그인을 하지 않아도 api를 호출 합니다.
            <br/>
            Main 페이지
            {
                isLoggedIn
                ?
                    <div>
                        로그인 상태
                        <br/>
                        {id}
                    </div>
                :
                    <div>비로그인 상태</div>
            }
            <br/>
            카운트 Redux
            <p>{count}</p>
            <button onClick={() => dispatch(increment())}>+1</button>
            <button onClick={() => dispatch(decrement())}>-1</button>




            <Kakaomap/>

        </div>
    )
}

export default MainComponent ;