import React, {useEffect, useState} from "react";
import {batisTest, fetchTest} from "../api/Api";


const TestComponent = () => {

    const [test, setTest] = useState([]);
    const [test2, setTest2] = useState("");
    const [lists, setLists] = useState([]);
    const [selectAll, setSelectAll] = useState([]);



    useEffect(() => {
        fetchTest()
            .then(response => {
                console.log(response);
                setTest(response.test);
                setTest2(response.test2[0].authority);
                setLists(response.test3);
            }).catch(error => {
            alert("관리자만 사용할수 있는 기능입니다. \n 관리자 로그인을 해주세요.")
            console.log(error);
        }, []);

        batisTest()
            .then(response => {
                setSelectAll(response.selectAll);
            }).catch(error => {
            console.log("batis error" + error)
        }, []);


    }, []);


    return (
        <div>
            로그인한 유저의 name : {test}
            <br/>
            로그인한 유저의 Authorities : {test2}
            <br/>
            로그인 성공시 api 요청
            <br/>
            Test 페이지
            <br/>
            <div style={{border: "1px solid black"}}>
                <h2>로그인 기록 : JPA</h2>
                {
                    lists.map((lists) =>
                        <div key={lists.loginSn}>
                            <span>{lists.loginSn}번째 : {lists.frstRegistDt} ,</span>
                            <span>접속 id : {lists.memberSn.membId} , </span>

                            <span>
                                    권한 :
                                {
                                    lists.memberSn.membCls.codeValue === "ROLE_ADMIN"
                                        ? "어드민"
                                        :
                                        "유저"

                                }
                                </span>

                        </div>
                    )
                }

            </div>
            <div style={{border:"1px solid black"}}>
                <h2>모든 유저 : mybatis</h2>
                {
                    selectAll.map((lists)=>
                        <div key={lists.memb_sn}>
                            <span>Sn : {lists.memb_sn} ,Nm : {lists.memb_nm} , Id : {lists.memb_id} ,Email : {lists.email_addr}</span>
                        </div>
                    )
                }
            </div>

            <div style={{border:"1px solid #e8e8e8"}}>
                <h2>공지사항 등록 :</h2>

            </div>
        </div>
    )
}

export default TestComponent;