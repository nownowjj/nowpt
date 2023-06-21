import React, {useEffect, useState} from "react";
import {batisTest, fetchTest} from "../api/Api";
import {selectLoginStatistics} from "../api/AdminApi";


const TestComponent = () => {

    const [test, setTest] = useState([]);
    const [test2, setTest2] = useState("");
    const [lists, setLists] = useState([]);
    const [selectAll, setSelectAll] = useState([]);
    const [loginList,setLoginList] = useState([]);



    useEffect(() => {
        // fetchTest()
        //     .then(response => {
        //         // console.log(response);
        //         setTest(response.test);
        //         setTest2(response.test2[0].authority);
        //         setLists(response.test3);
        //     }).catch(error => {
        //     alert("관리자만 사용할수 있는 기능입니다. \n 관리자 로그인을 해주세요.")
        //     console.log(error);
        // }, []);
        //
        // batisTest()
        //     .then(response => {
        //         setSelectAll(response.selectAll);
        //     }).catch(error => {
        //     console.log("batis error" + error)
        // }, []);

        selectLoginStatistics()
            .then(response => {
                console.log(response.data);
                setLoginList(response.data.content);
            }).catch(error => {
            console.log("loginhst error" + error)
        }, []);


    }, []);


    return (
        <div>
            로그인한 유저의 name : {test}
            <br/>
            로그인한 유저의 Authorities : {test2}
            <br/>
            Test 페이지
            <br/>
            <div style={{border: "1px solid black"}}>
               {/* <h2>로그인 기록 : JPA</h2>
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
                }*/}

            </div>
            <div style={{border:"1px solid black"}}>
{/*                <h2>모든 유저 : mybatis</h2>
                {
                    selectAll.map((lists)=>
                        <div key={lists.memb_sn}>
                            <span>Sn : {lists.memb_sn} ,Nm : {lists.memb_nm} , Id : {lists.memb_id} ,Email : {lists.email_addr}</span>
                        </div>
                    )
                }*/}
            </div>

            <div style={{border:"1px solid #e8e8e8"}}>
                <h2>로그인 이력 통계 : mybatis</h2>
                <table>
                    <thead>
                        <tr>
                            <th>일자</th>
                            <th>접속건수</th>
                            <th>접속자수(동일 유저 중복제거)</th>
                            <th>누적접속건수</th>
                            <th>누적접속자수</th>
                        </tr>
                    </thead>
                    <tbody>

                        {loginList && loginList.map((datas)=>{
                            return(
                                <tr key={datas.data_one}>
                                    <td>{datas.data_one}</td>
                                    <td>{datas.data_two}</td>
                                    <td>{datas.data_three}</td>
                                    <td>{datas.data_four}</td>
                                    <td>{datas.data_five}</td>
                                </tr>
                            )
                        })

                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TestComponent;