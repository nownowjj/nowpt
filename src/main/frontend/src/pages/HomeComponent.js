import React, {useEffect, useState} from "react";
import {homeTest, naverMovie} from "../api/Api";
import Button from "../component/JoinButton";
import Input from "../component/Input";

const HomeComponent =(props)=>{
    const [message,setMessage] = useState("");
    const [searchParam,setSearchParam] = useState("");

    const[searchResult,setSearchResult] = useState(null);
    const[searchCount,setSearchCount] = useState(null);



    useEffect(()=>{


        homeTest()
            .then(response => {
                setMessage(response.message)
            }).catch(error => {
            console.log(error)
        });

    },[]);



    // async await promise result 추출
    // async function test(){
    //     let result = await homeTest();
    //     console.log(result.message);
    // }


    const naverMovieFunction =()=>{
        if(searchParam.length < 1 ){
            alert('검색어를 입력하세요.')
            return false;
        }
        naverMovie(searchParam)
            .then(response =>{
                setSearchCount(response.display)
                setSearchResult(response.items)
                // setSearchResult( response.items)
                console.log(response.items)
            }).catch(error =>{
            console.log(error)
        })
    }

    const changeSearch=(value)=>{
        setSearchParam(value);
    }


    // const testBtn =()=>{
    //     showAndroidToast('hello Android!');
    // }

    function callFromApp() {
        var broswerInfo = navigator.userAgent;
        if(broswerInfo.indexOf("Android")>-1) {
            window.MyTestApp.AlertMsg("웹뷰에서 호출된 메시지입니다");
        }
    }

    return (
            <div>
                api : {message}
                <br/>
                Home 페이지
                <br/>
                <Button
                    value="ㄴㄴ"
                    onClick={callFromApp}
                />
                {/*<img src={mguImg} alt="img"/>*/}

                <br/>

                네이버 영화검색 API

                <Input
                    placeholder="영화제목 입력"
                    onChange={changeSearch}
                />

                <Button value="검색" onClick={naverMovieFunction}></Button>
                {
                    searchCount === null?null:<p>총 : {searchCount}건</p>
                }
                <p></p>
                {
                    searchResult === null
                    ?
                        <p>you need search query</p>
                    :
                        <table>
                            <thead>
                            <tr>
                                <th>제목</th>
                                <th>서브 제목</th>
                                {/*<th>링크</th>*/}
                                <th>이미지</th>
                                <th>감독</th>
                                <th>배우</th>
                                {/*<th>날짜</th>*/}
                                <th>평점</th>
                            </tr>
                            </thead>

                            <tbody>
                            {searchResult && searchResult.map((list,index) => {
                                return (
                                    <tr
                                        key={index}
                                    >

                                        <td><a href={list.link} dangerouslySetInnerHTML={{ __html: list.title }}></a></td>
                                        <td dangerouslySetInnerHTML={{ __html: list.subtitle }}></td>
                                        <td>
                                            <img alt="영화 포스터 사진" src={list.image}/>
                                        </td>
                                        <td>{list.director}</td>
                                        <td>{list.actor}</td>
                                        <td>{list.userRating}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                }

            </div>
        )
    }
export default HomeComponent ;