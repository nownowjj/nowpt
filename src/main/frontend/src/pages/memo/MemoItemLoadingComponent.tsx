import React from 'react';
import {MemoContent, MemoDate, MemoItemComponentWrap, MemoTitle} from "./MemoItemComponent";
import LoadingDotComponent from "../../component/LoadingDotComponent";

/**
 * @param size
 * @return size 개수 만큼 MemoLoadingComponent return
 */
const MemoItemLoadingComponent = ({size}:{size:number}) => {
    return (
        <>
            {[...Array(size)].map((_, index) => (
                <MemoItemComponentWrap key={`memo_loading_${index}`}>
                    <MemoContent><LoadingDotComponent size={12}/></MemoContent>
                    <MemoTitle><LoadingDotComponent size={9}/></MemoTitle>
                    <MemoDate><LoadingDotComponent delay={true} loop={5} size={7}/></MemoDate>
                </MemoItemComponentWrap>
            ))}
        </>
    );
};

export default MemoItemLoadingComponent;