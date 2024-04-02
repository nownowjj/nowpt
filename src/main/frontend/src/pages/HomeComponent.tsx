import React from "react";
import {homeTest} from "../api/Api";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {route} from "../services/remocon";
import {useQuery} from "react-query";

export interface HomeTestData {
    message:string
    // 여기에 데이터의 타입을 정의해주세요
}
// c
const HomeComponent =()=>{
    const dispatch = useDispatch();



    const navigate = useNavigate();

    const key = Object.keys(route)
    const value = Object.values(route)




    const { isLoading, isError, data, isFetching } = useQuery({
        queryKey: ['tod'],
        queryFn: async () => {
            const result = await homeTest();
            return result.data; // homeTest의 결과를 반환
        },
    });

    console.log(isLoading , isError , data , isFetching);

    return (
            <div>
                {key && key.map((list,index)=>{
                    return(
                        <div key={index}  onClick={()=> navigate(value[index])} >{list} {value[index]}</div>
                    )
                })}

                <hr/>
                {data?.message}
                <div>{isFetching ? '요청중...' : '요청 성공'}</div>
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