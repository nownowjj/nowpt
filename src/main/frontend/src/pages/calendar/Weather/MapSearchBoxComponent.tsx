import React, {useState} from 'react';
import styled from "styled-components";
import {BiSearch} from "react-icons/bi";
import {useDispatch} from "react-redux";
import {setCoordinate} from "../../../redux/slice/mapSlice";

interface MapSearchBoxProps {
    searchCallBack : (searchText:string)=>void;
}

const MapSearchBoxComponent = ({searchCallBack}:MapSearchBoxProps) => {
    const dispatch = useDispatch();
    const [searchText , setSearchText] = useState("");
    const handleChange=(value:any)=>{
        setSearchText(value)
    }

    const searchEvent =(e: { preventDefault: () => void; })=>{
        e.preventDefault();

        if(searchText === ""){
            alert("검색어를 입력해 주세요")
            return
        }
        dispatch(setCoordinate({lat:"",lng:""}));
        searchCallBack(searchText);
    }

    return (
        <MapSearchBox>
            <StyledSearch/>
            <SearchInput value={searchText} onChange={(e)=> handleChange(e.target.value)} placeholder={"검색어를 입력해주세요. (ex: 강남 맛집)"}/>
            <SearchButton onClick={(e)=> searchEvent(e)}>검색</SearchButton>
        </MapSearchBox>
    );
};

const MapSearchBox = styled.div`
  position: absolute;
  top: 60px;
  left: 50%;
  transform:translateX(-50%);
  z-index: 11;
  min-width: 280px;
  width: 70%;
  max-width: 500px;
  height: 40px;
  background: #fff;
  border-radius: 10px;
  border: 2px solid #e8e8e8;
  display: flex;
`
const StyledSearch = styled(BiSearch)`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 9px;
`

const SearchInput = styled.input`
  width: 100%;
  position: relative;
  background: white;
  height: 100%;
  outline: none;
  transition: 0.1s;
  border: none;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  padding: 0 3px;
`
const SearchButton = styled.button`
  background: none;
  outline: none;
  border: none;
  width: 50px;
  color: gray;
`

export default MapSearchBoxComponent;