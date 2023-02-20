import React, {useEffect, useState} from "react";
import {homeTest} from "../api/Api";
import mguImg from "../assets/mgu.jpg"
import Kakaomap from "../services/kakaomap/Kakaomap";
import Button from "../component/JoinButton";

const HomeComponent =(props)=>{
    const [message,setMessage] = useState("");



    useEffect(()=>{


        homeTest()
            .then(response => {
                setMessage(response.message)
            }).catch(error => {
            console.log(error)
        });
    },[]);


    // async await promise result 추출
    async function test(){
        let result = await homeTest();
        console.log(result.message);
    }

    const clickTest=()=>{
        test();
    }

    async function one(){
        console.log("one")
    }
    async function two(){
        console.log("two")
    }



        return (
            <div>
                api : {message}
                <br/>
                Home 페이지
                <br/>
                {/*<img src={mguImg} alt="img"/>*/}

                <Button
                    value="버튼"
                    onClick={clickTest}
                />

            </div>
        )
    }
export default HomeComponent ;