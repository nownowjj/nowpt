import React from 'react';
import moment from "moment";
import styled from "styled-components";

interface DotsComponentInterface {
    date:Date;
    mark:string[]
}

const DotsComponent = (data:DotsComponentInterface) => {
    const colors = ['red', 'blue', 'purple', 'green', 'black', 'black', 'black', 'black', 'black', 'black'];

    const date =moment(data.date).format('YYYYMMDD');// 해당 일자
    const mark = data.mark;                                   // 이벤트 일자 ex : ['2023-06-10','2023-06-23','2023..]
    const count = mark.filter(item => item === date).length;  // 해당 일자가 이벤트 일자에 몇개 포함하는지
    const dotsDivs = [];
    for (let index = 0; index < count; index++) {
        dotsDivs.push(<Dot key={index} color={colors[index]} />);
    }
    return (
        <DotWrap className="dotWrap" >
            {dotsDivs}
       </DotWrap>
    );
};

const Dot = styled.div<{color:string}>`
    height: 8px;
    width: 8px;
    border-radius: 50%;
    display: flex;
    margin-left: 1px;
    background-color: ${({ color }) => color};
`
const DotWrap = styled.div`
    display: flex;
    bottom: 2px;
    position: absolute;
    // height: 16px;
    flex-wrap: wrap;
    padding-right: 6px;
`
export default DotsComponent;