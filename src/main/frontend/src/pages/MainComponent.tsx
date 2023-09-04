import React, {useEffect, useState} from "react";
import {mainTest} from "../api/Api";
import Kakaomap from "../services/kakaomap/Kakaomap";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../redux/slice/countSlice";
import ApiErrorHandle from "../services/ApiErrorHandle";
import {RootState, useTypedSelector} from "../redux/store/store";

const MainComponent = () => {
    const dispatch = useDispatch();


    const [message,setMessage] = useState<string>("");

    const count = useSelector((state:RootState) => state.count.count);
    const isLoggedIn = useTypedSelector((state:RootState) => state.user.isLoggedIn);
    // const user = useSelector((state) => state.user.value.user);

    useEffect(()=>{
        mainTest()
            .then(response => {
                    setMessage(response.message)
            }).catch(error =>{
            ApiErrorHandle(error)
        });
    },[])



    
    
    return (
        <div>
            api : {message}, 홈,메인은 로그인을 하지 않아도 api를 호출 합니다.
            <br/>
            Main 페이지
            {
                isLoggedIn
                ?
                    <div>
                        로그인 상태
                        <br/>
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