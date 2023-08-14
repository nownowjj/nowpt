import React, {useEffect, useState} from 'react';
import FriendTitleComponent from "./FriendTitleComponent";
import FriendComponent from "./FriendComponent";
import {requestFriend} from "../../../api/friendApi";
import styled from "styled-components";
import {MdSearch, MdSearchOff} from "react-icons/md";

const FriendRecommendComponent = ({data,division}) => {
    let param={};

    const addCallBack=(key)=>{
        param.friendMemberSn = key;
        console.log(param);
        console.log("FriendApplyWaitComponent 친구 요청 ",key);
        requestFriend(param)
            .then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
        })
    }


    const [searchTerm, setSearchTerm] = useState('');     // 검색어
    const [filteredData, setFilteredData] = useState([]); // 검색 결과
    useEffect(() => {
        // 검색어에 따라 데이터 필터링
        let filtered;
        if(searchTerm.length > 0) { // 검색어가 존재해야함
            filtered = data.filter(item => item.friendNm.toLowerCase().includes(searchTerm.toLowerCase())); // 검색어로 이름 조회
            if(filtered.length > 0 ){
                setFilteredData(filtered); // 결과를 담음
            }else{
                setFilteredData([]); // 결과를 담음
            }
            console.log(filtered);
        }

    }, [searchTerm, data]);

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    const [searchCancel , setSearchCancel] = useState(true);
    return (
        <>
            {/* 추천 헤더 */}
            <RecommendHeader>
                <FriendTitleComponent
                    title="친구 추천"
                    search={true}
                />
                {
                        searchCancel?
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
            {!searchCancel ?
                // 검색 모드
                <>
                { searchTerm && searchTerm.length >0 && filteredData.map(item => (
                    <FriendComponent
                        key={item.friendMemberSn}
                        data={item}
                        paramKey={item.friendMemberSn}
                        leftText='친구 추가'
                        rightText='삭제'
                        leftCallBack={addCallBack}
                        division={division}
                        // rightCallBack={removeCallBack}
                    />
                ))}
                </>
                // 검색 모드
            :
                // 검색 모드 X
                data.map((recommendList) => (
                    <FriendComponent
                        key={recommendList.friendMemberSn}
                        data={recommendList}
                        paramKey={recommendList.friendMemberSn}
                        leftText='친구 추가'
                        rightText='삭제'
                        leftCallBack={addCallBack}
                        division={division}
                        // rightCallBack={removeCallBack}
                    />
                ))
                // 검색 모드 X
            }
            {/* 추천 리스트 */}

        </>
    );
};
const SearchWrap = styled.div`
    border:1px solid #e8e8e8;
    border-radius:10px;
    margin-top:10px;
    display:flex;
    padding-left: 10px;
`

const SearchInput = styled.input`
    outline:none;
    border:none;
    border-right:1px solid #e8e8e8;
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