import React from 'react';
import styled from "styled-components";
import {MemoResponseType} from "../../api/Memo";
import {getFormatDay} from "../../services/formattingDay";
import MemoCheckBoxComponent from "./MemoCheckBoxComponent";

interface MemoItemInterface {
    data:MemoResponseType
    click:(data:MemoResponseType)=>void;
    isDeleteMode:boolean;
}

const MemoItemComponent = ({data,click,isDeleteMode}:MemoItemInterface) => {
    const handleClick = () => {
        if (!isDeleteMode) {
            click(data);
        }
    };

    return (
        <MemoItemComponentWrap className="longPress">
            <MemoContent onClick={handleClick}>
                {(data.memoSn && isDeleteMode) &&  <MemoCheckBoxComponent checkKey={data.memoSn}/> }
                {data.memoSn}{data.content}
            </MemoContent>
            <MemoTitle>{data.title}</MemoTitle>
            <MemoDate>{getFormatDay(data.lastRegistDt , "YY.MM.DD ddd요일")}</MemoDate>
        </MemoItemComponentWrap>
    );
};
export const MemoItemComponentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`

export const MemoDate = styled.div`
  text-align: center;
  color: gray;
  font-size: 11px;
`

export const MemoTitle = styled.div`
  width: 100%;
  text-align: center;
  color: #202020;
  font-size: 12px;
  padding: 2px 10px;
  //font-weight: ;
  
  white-space: nowrap; /* 텍스트를 한 줄로만 표시 */
  overflow: hidden; /* 영역을 벗어나는 텍스트는 숨김 처리 */
  text-overflow: ellipsis; /* 영역을 벗어나는 텍스트에는 ... 처리 */
`

export const MemoContent = styled.div`
  // MemoItem 영역에서 텍스트가 벗어나지 않도록 처리
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  // 왼쪽 위에서부터 글자가 시작되도록 처리
  text-align: left;
  // 자동으로 줄바꿈 처리
  white-space: pre-wrap;
  overflow-y: hidden;
  background: white;
  position: relative;
  z-index: 1;
  border: 1px solid #e8e8e8;
  padding: 5px 10px;
  font-size: 14px;
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