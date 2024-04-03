import React from 'react';
import {MemoContent, MemoDate, MemoItemComponentWrap, MemoTitle} from "./MemoItemComponent";
import LoadingDotComponent from "../../component/LoadingDotComponent";


const MemoItemLoadingComponent = ({size}:{size:number}) => {
    console.log('로딩로딩로딩',size);


    return (
        <>
            {[...Array(size)].map((_, index) => (
                <MemoItemComponentWrap key={`memo_loading_${index}`}>
                    <MemoContent></MemoContent>
                    <MemoTitle><LoadingDotComponent size={12}/></MemoTitle>
                    <MemoDate><LoadingDotComponent delay={true} loop={5} size={11}/></MemoDate>
                </MemoItemComponentWrap>
            ))}
        </>
    );
};

export default MemoItemLoadingComponent;