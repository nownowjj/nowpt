import React from 'react';
import styled from "styled-components";

const MemoItemComponent = () => {
    return (
        <div>
            <MemoItem/>

            <MemoTitle>제목</MemoTitle>
        </div>
    );
};
const MemoTitle = styled.div`
  text-align: center;
`

const MemoItem = styled.div`
  border: 1px solid #e8e8e8;

  height: 240px;
  border-radius: 5px;

  width: calc((100% - 40px) / 2); /* 화면 전체 너비에서 간격을 뺀 후 2로 나눈 값으로 설정 (20px은 좌우 여백 고려) */
  min-width: 160px; /* 최소 가로 길이 */
  max-width: 250px; /* 최대 가로 길이 */
  //background-color: lightblue; /* 배경색 설정 (원하는 스타일로 변경 가능) */

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* x, y, 흐림, 색상 설정 */
  transition: box-shadow 0.3s ease-in-out; /* 그림자 효과에 트랜지션 효과 추가 */

  @media (min-width: 768px) {
    /* 768px 이상의 화면 너비에서는 한 행당 3개의 요소를 표시하고 싶으므로 너비를 다시 설정 */
    //width: calc((100% - 60px) / 3); /* 화면 전체 너비에서 간격을 뺀 후 3으로 나눈 값으로 설정 (20px은 좌우 여백 고려) */
    width: 200px;
    height: 300px;
  }

  @media (min-width: 1024px) {
    /* 1024px 이상의 화면 너비에서는 한 행당 4개의 요소를 표시하고 싶으므로 너비를 다시 설정 */
    //width: calc((100% - 80px) / 4); /* 화면 전체 너비에서 간격을 뺀 후 4으로 나눈 값으로 설정 (20px은 좌우 여백 고려) */
    width: 300px;
    height: 340px;
  }
  
`
export default MemoItemComponent;