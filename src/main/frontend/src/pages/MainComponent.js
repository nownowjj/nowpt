import React, {useEffect, useState} from "react";
import {mainTest} from "../api/Api";
import Button from "../component/JoinButton";

const MainComponent = () => {
    const [message,setMessage] = useState("");


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

    const clickTest=(e)=>{
        alert("dd")
    }



    return (
        <div>
            api : {message}, 홈,메인은 로그인을 하지 않아도 api를 호출 합니다.
            <br/>
            Main 페이지


            <Button
                value="버튼"
                onClick={clickTest}
            />

        </div>
    )
}

export default MainComponent ;