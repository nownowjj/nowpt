import React, {useEffect, useState} from "react";
import {mainTest} from "../api/Api";
import Kakaomap from "../services/kakaomap/Kakaomap";
import {useSelector} from "react-redux";

const MainComponent = () => {
    const [message,setMessage] = useState("");
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);
    console.log("메인!")
    console.log(isLoggedIn)
    console.log(user)

    useEffect(()=>{
        mainTest()
            .then(response => {
                // console.log(response);
                // console.log("api/main")
                    setMessage(response.message)
            }).catch(error =>{
            console.log(error)
        });
    })






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
                        {user.membId}
                    </div>
                :
                    <div>비로그인 상태</div>
            }



            <Kakaomap/>

        </div>
    )
}

export default MainComponent ;