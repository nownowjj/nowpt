import React, {useEffect, useState} from "react";
import {homeTest} from "../api/Api";
import mguImg from "../assets/mgu.jpg"
import Kakaomap from "../services/kakaomap/Kakaomap";

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

        return (
            <div>
                api : {message}
                <br/>
                Home 페이지
                <br/>
                <img src={mguImg} alt="img"/>



            </div>
        )
    }
export default HomeComponent ;