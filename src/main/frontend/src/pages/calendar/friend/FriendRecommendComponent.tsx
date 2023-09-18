import React, {useEffect, useState} from 'react';
import FriendTitleComponent from "./FriendTitleComponent";
import FriendComponent from "./FriendComponent";
import {requestFriend} from "../../../api/friendApi";
import styled from "styled-components";
import {MdSearch, MdSearchOff} from "react-icons/md";
import {useDispatch} from "react-redux";
import {firstEvent, fiveEvent} from "../../../redux/slice/friendSlice";
import AlertComponent from "../component/AlertComponent";
import {FriendMemberSn} from "../../../model/FriendApiModel";
import {friendDto} from "./FriendPage";
import CalendarDetailNo from "../component/CalendarDetailNo";

interface FriendRecommendComponentInterface {
    data:friendDto[];
}
export interface requestType {
    [key:string] :()=>void;
}
const FriendRecommendComponent:React.FC<FriendRecommendComponentInterface> = ({data}) => {
    const dispatch = useDispatch();

    // Alert 여부
    const [showAlert , setShowAlert] = useState<boolean>(false);
    const [messageCall, setMessageCall] = useState<string>('');
    const [closeCallBackFn , setCloseCallBackFn] = useState<()=>void>();
    const alertFunction =(closeCallBack:()=> void ,message:string)=>{
        setCloseCallBackFn(() => closeCallBack)
        setMessageCall(message);
        setShowAlert(true);
    }


    const requestResponseMap:requestType ={
        'REQUEST_SUCCESS' :()=> dispatch(firstEvent()),
        'DIRECT_ACCEPT'   :()=> dispatch(fiveEvent())
    }

    const addCallBack=(key:number)=>{
        const param :FriendMemberSn={friendMemberSn:key};
        console.log("FriendApplyWaitComponent 친구 요청 ",key);
        requestFriend(param)
            .then((response)=>{
                console.log(response);
                // 친구 요청에 성공 했으면 보낸요청 , 친구추천 리스트를 리렌더링 시켜야함
                requestResponseMap[response.data]();
                alertFunction(()=> setShowAlert(false),response.message)
            }).catch((error)=>{
            alertFunction(()=> setShowAlert(false),'요청 실패!')
            console.log(error);
        })
    }


    const [searchTerm, setSearchTerm] = useState<string>('');     // 검색어
    const [filteredData, setFilteredData] = useState<friendDto[]>([]); // 검색 결과
    useEffect(() => {
        // 검색어에 따라 데이터 필터링
        if(searchTerm.length > 0) { // 검색어가 존재해야함
            const filtered = data.filter(item => item.friendNm.toLowerCase().includes(searchTerm.toLowerCase())); // 검색어로 이름 조회
            if(filtered.length > 0 ){
                setFilteredData(filtered); // 결과를 담음
            }else{
                setFilteredData([]); // 결과를 담음
            }
            console.log(filtered);
        }

    }, [searchTerm, data]);

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const info =(key:number)=>{
        console.log(key);
        alertFunction(()=>setShowAlert(false),`${key}`)
    }

    const [searchCancel , setSearchCancel] = useState<boolean>(true);
    return (
        <>
            {/* 추천 헤더 */}
            <RecommendHeader>
                <FriendTitleComponent
                    title="친구 추천"
                    size={data.length}
                />
                {
                    searchCancel
                        ?
                        <StyledSearch onClick={()=>  setSearchCancel(prevState => !prevState)}/>
                        :
                        <SearchWrap>
                            <SearchInput
                                type="text"
                                placeholder="성함을 입력해주세요"
                                value={searchTerm}
                                onChange={handleInputChange}
                            />
                            <StyledSearchCancel onClick={()=>  setSearchCancel(prevState => !prevState)}/>
                        </SearchWrap>
                }
            </RecommendHeader>
            {/* 추천 헤더 */}

            {/* 추천 리스트 */}
            {
                !searchCancel
                    ?
                    <>
                        {   // 검색 모드
                            searchTerm && searchTerm.length >0 &&
                            filteredData.length > 0 ?
                                filteredData.map(item => (
                                    <FriendComponent
                                        key={item.friendMemberSn}
                                        data={item}
                                        paramKey={item.friendMemberSn}
                                        leftText='친구 요청'
                                        // rightText={moment(item.frstRegistDt).format('YYYY-MM-DD')}
                                        leftCallBack={addCallBack}
                                        rightCallBack={()=>{}}
                                    />
                                ))
                                :
                                !searchTerm? '검색어를 입력해 주세요' : '검색 결과가 없습니다'
                        }
                    </>
                    // 검색 모드
                    :
                    // 검색 모드 X
                    data && data.length > 0 ?
                    data.map((recommendList) => (
                        <FriendComponent
                            key={recommendList.friendMemberSn}
                            data={recommendList}
                            paramKey={recommendList.friendMemberSn}
                            leftText='친구 요청'
                            // rightText={moment(recommendList.frstRegistDt).format('가입 : YYYY-MM-DD')}
                            leftCallBack={addCallBack}
                            rightCallBack={info}
                        />
                    ))
                        :
                        <CalendarDetailNo/>
                // 검색 모드 X
            }
            {/* 추천 리스트 */}


            {/* AlertComponent */}
            {showAlert &&(
                <AlertComponent
                    message= {messageCall}
                    onClose={()=> {
                        closeCallBackFn && closeCallBackFn();
                        setShowAlert(false);
                    }}
                />
            )}
            {/* AlertComponent */}
        </>
    );
};
const SearchWrap = styled.div`
    border:2px solid #e8e8e8;
    border-radius:10px;
    margin-top:10px;
    display:flex;
    padding-left: 10px;
    margin-right: 15px;
`

const SearchInput = styled.input`
    outline:none;
    border:none;
    border-right:2px solid #e8e8e8;
`

const RecommendHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StyledSearch = styled(MdSearch)`
    font-size:30px;
    margin-top:10px;
`

const StyledSearchCancel = styled(MdSearchOff)`
    font-size:30px;
    margin-left: 5px;
`
export default FriendRecommendComponent;