import React from 'react';
import {SearchResultPagination} from "./map";
import styled from "styled-components";

interface SearchPaginationProps {
    pagination: SearchResultPagination;
}

const SearchPaginationComponent = ({pagination}:SearchPaginationProps) => {
    return (
        <SearchPagination>
            {Array.from({ length: pagination.last }, (_, i) => {
                const pageIndex = i + 1;
                return (
                    <Button
                        key={pageIndex}
                        className={pageIndex === pagination.current ? 'activeBtn' : ''}
                        onClick={(e) => {
                            e.preventDefault();
                            pagination.gotoPage(pageIndex);
                        }}
                    >
                        {pageIndex}
                    </Button>
                );
            })}
        </SearchPagination>
    );
};

const SearchPagination = styled.div`
   height: 50px;
   border-top:1px solid #e8e8e8;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 15px;
`

const Button = styled.button`
  border: 1px solid #e8e8e8;
  width: 25px;
  height: 25px;
  font-weight: bold;
  color: black;
  border-radius: 50%;

  &.activeBtn {
    background: #66c4d5;
    color:#fff
  }
`

export default SearchPaginationComponent;