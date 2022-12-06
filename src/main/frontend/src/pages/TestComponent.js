import React, {useEffect, useState} from "react";
import {fetchTest} from "../api/Api";


const TestComponent = () => {

    const [test,setTest] = useState([]);
    const [test2,setTest2] = useState("");
    const [lists,setLists] = useState([]);


    useEffect(()=> {
        fetchTest()
            .then(response => {
                // console.log(response);
                // console.log("nm : "+response.test)
                // console.log("Authority : "+ JSON.stringify(response.test2[0].authority));
                // console.log("-- login Hst --");
                // console.log(response.test3);
                setTest(response.test);
                setTest2(response.test2[0].authority);
                setLists(response.test3);
            }).catch(error => {
            alert("관리자만 사용할수 있는 기능입니다. \n 관리자 로그인을 해주세요.")
            console.log(error);
        }, []);

    },[]);


        return (
            <div>
                 로그인한 유저의 name :  {test}
                <br/>
                 로그인한 유저의 Authorities :  {test2}
                <br/>
                로그인 성공시 api 요청
                <br/>
                 Test 페이지
                <br/>
                <div>
                            <h2>로그인 기록</h2>
                    {
                        lists.map((lists) =>
                            <div key={lists.loginSn}>
                                <span>{lists.loginSn}번째 : {lists.frstRegistDt} ,</span>
                                <span>접속 id : {lists.memberSn.membId} , </span>

                                <span>
                                    권한 :
                                    {
                                        lists.memberSn.membCls.codeValue === "ROLE_ADMIN"
                                        ?"어드민"
                                            :
                                            "유저"

                                    }
                                </span>

                            </div>



                        )
                    }

                </div>
            </div>
        )
}

export default TestComponent ;