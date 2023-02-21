import React, {useEffect, useState} from "react";
import {homeTest, naverMovie} from "../api/Api";
import Button from "../component/JoinButton";
import Input from "../component/Input";

const HomeComponent =(props)=>{
    const [message,setMessage] = useState("");
    const [searchParam,setSearchParam] = useState("");



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

    const naverMovieFunction =()=>{
        naverMovie(searchParam)
            .then(response =>{
                console.log(response)
            }).catch(error =>{
            console.log(error)
        })
    }

    const changeSearch=(value)=>{
        // console.log(value);
        setSearchParam(value);
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
                <br/>

                네이버 영화검색 API

                <Input
                    placeholder="영화제목 입력"
                    onChange={changeSearch}
                >
                </Input>
                {/* 새롭게 입력한 이메일로 변경 요청 */}
                <Button value="검색" onClick={naverMovieFunction}></Button>
            </div>
        )
    }
export default HomeComponent ;