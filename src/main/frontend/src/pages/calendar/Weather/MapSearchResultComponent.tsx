import React from 'react';
import styled from "styled-components";
import {SearchResultProps} from "./MapBox";
import SearchItemComponent from "./SearchItemComponent";
import SearchPaginationComponent from "./SearchPaginationComponent";


interface MapSearchResultProps {
    searchKeyword?: string;
    searchResults: SearchResultProps | null;
}


const MapSearchResultComponent = ({searchKeyword,searchResults}:MapSearchResultProps) => {
    return (
        <MapSearchResultWrap>
            <SearchKeyword>"<strong>{searchKeyword}</strong>" 검색 결과</SearchKeyword>
            <SearchResultWrap>
                {
                    (searchResults?.data != null) ?
                    searchResults.data.map((result,index)=>(
                        <SearchItemComponent data={result} index={index+1}/>
                ))
                    :
                        <SearchEmptyWrap>
                            검색결과가 존재하지 않습니다!
                        </SearchEmptyWrap>
                }
            </SearchResultWrap>

            {
                <SearchPaginationComponent pagination={searchResults?.pagination}/>
            }

        </MapSearchResultWrap>
    );
};

const SearchEmptyWrap = styled.div`
  
`
const SearchKeyword = styled.div`
    height: 50px;
    border-bottom: 1px solid #e8e8e8;
    text-align: center;
    line-height: 50px; 
`

const MapSearchResultWrap = styled.div`
  position: fixed;
  z-index: 101;
  height: 100vh;
  width: 70%;
  max-width: 300px;
  background: #fff;
  bottom: 0;
  right: 0;
  border-left: 1px solid #e8e8e8;
  top: 0;
  overflow: auto;
`

const SearchResultWrap = styled.ul`
  height: calc(100% - 100px);
  overflow: auto;
`

export default MapSearchResultComponent;