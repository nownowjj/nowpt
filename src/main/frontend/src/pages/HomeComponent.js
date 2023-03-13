import React, {useEffect, useState} from "react";
import {homeTest, naverMovie} from "../api/Api";
import Button from "../component/JoinButton";
import Input from "../component/Input";
import Loading from "./LoadingComponent";

const HomeComponent =(props)=>{
    const [message,setMessage] = useState("");
    const [searchParam,setSearchParam] = useState("");

    const[searchResult,setSearchResult] = useState(null);
    const[searchCount,setSearchCount] = useState(null);

    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        setLoading(true);
        homeTest()
            .then(response => {
                setMessage(response.message);
                setLoading(false)
            }).catch(error => {
            console.log(error)
        });
    },[]);

    const naverMovieFunction =()=>{
        if(searchParam.length < 1 ){
            alert('검색어를 입력하세요.')
            return false;
        }

        setLoading(true);
        naverMovie(searchParam)
            .then(response =>{
                setSearchCount(response.display)
                setSearchResult(response.items)
                // setSearchResult( response.items)
                console.log(response.items)
                setLoading(false)
            }).catch(error =>{
            console.log(error)
        })
    }

    const changeSearch=(value)=>{
        setSearchParam(value);
    }



    return (
            <div>
                {loading ? <Loading/> : null}
                api : {message}
                <br/>
                Home 페이지
                <br/>



                {/*<ChatButton*/}
                {/*    onClick={openChatModal}*/}
                {/*    detail_id={detail_id}*/}
                {/*    // is_chat={is_chat}*/}
                {/*    // chat_list={chat_list}*/}
                {/*    // is_me={is_me}*/}
                {/*    // // user_info={user_info}*/}
                {/*>*/}
                {/*    <ChatStyle>*/}
                {/*        <ChatIcon style={{ fontSize: 15,  margin: "0 10px" }}></ChatIcon>*/}
                {/*    </ChatStyle>*/}
                {/*    채팅하기*/}
                {/*</ChatButton>*/}


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

// const ChatButton=styled.button`
//
// padding: 8px 24px;
// background-color:#6fa1f6;
// border-radius:30px;
// margin:8px;
// border:1px solid #6fa1f6;
// width:11vw;
// font-size:15px;
// color:#fff;
// cursor: pointer;
//
// `;
//
// const ChatStyle=styled.div`
// margin-bottom: 2px;
// `;