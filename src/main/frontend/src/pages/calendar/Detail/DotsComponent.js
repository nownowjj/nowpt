import React from 'react';
import moment from "moment";
import styled from "styled-components";

const DotsComponent = (data) => {  // data {date...  mark...}
    const styles = {
        dot1: {backgroundColor: 'red'},
        dot2: {backgroundColor: 'blue'},
        dot3: {backgroundColor: 'purple'},
        dot4: {backgroundColor: 'green'},
        dot5: {backgroundColor: 'black'},
        dot6: {backgroundColor: 'black'},
        dot7: {backgroundColor: 'black'},
        dot8: {backgroundColor: 'black'},
        dot9: {backgroundColor: 'black'},
        dot10: {backgroundColor: 'black'}
    };

    const date =moment(data.date).format('YYYYMMDD');// 해당 일자
    const mark = data.mark;                                   // 이벤트 일자 ex : ['2023-06-10','2023-06-23','2023..]
    const count = mark.filter(item => item === date).length;  // 해당 일자가 이벤트 일자에 몇개 포함하는지
    const dotsDivs = Array(count).fill().map((_, index) => {
        return (
            <Dot key={index} style={styles[`dot${index + 1}`]}/>
        );
    });

    // const dotWrapStyles = count > 0 ? { background: '#e8e8e8' } : {};


    return (
        <DotWrap className="dotWrap" >
            {dotsDivs}
       </DotWrap>
    );
};

const Dot = styled.div`
    height: 8px;
    width: 8px;
    border-radius: 50%;
    display: flex;
    margin-left: 1px;
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