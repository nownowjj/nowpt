import React, {useEffect, useState} from "react";
import {mainTest} from "../api/Api";
import Kakaomap from "../services/kakaomap/Kakaomap";

const MainComponent = () => {
    const [message,setMessage] = useState("");
    console.log("메인!")

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



            <Kakaomap/>

        </div>
    )
}

export default MainComponent ;