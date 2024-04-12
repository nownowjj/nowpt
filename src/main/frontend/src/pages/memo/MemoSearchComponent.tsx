import React, {useState} from 'react';
import styled from "styled-components";
import {BiSearch} from "react-icons/bi";


const MemoSearchComponent = ({searchCallback}:{searchCallback:(text:any)=>void}) => {
    const [searchText , setSearchText] = useState("");

    const handleChange=(value:any)=>{
        setSearchText(value)
        searchCallback(value)
    }

    return (
        <MemoSearchWrap >
            <StyledSearch/>
            <SearchInput value={searchText} onChange={(e)=> handleChange(e.target.value)} placeholder={"제목 또는 메모 내용 입력"}/>
        </MemoSearchWrap>
    );
};

const MemoSearchWrap = styled.div`
  border: 1px solid rgb(232, 232, 232);
  width: fit-content;
  display: flex;
  align-items: center;
  margin: 10px 0 20px 20px;
  border-radius: 10px;
  height: 40px;

  @media (min-width: 768px) {
    margin-left: 30px;
  }

  @media (min-width: 1024px) {
    margin-left: 40px;
  }
`

const StyledSearch = styled(BiSearch)`
  margin: 10px 0;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  padding: 5px;
`

const SearchInput = styled.input`
  width: 300px;
  background: white;
  height: 100%;
  outline: none;
  transition: 0.1s;
  border: 1px solid rgb(232, 232, 232);
  padding: 0 10px;
  border-radius: 0 10px 10px 0;

`

export default MemoSearchComponent;