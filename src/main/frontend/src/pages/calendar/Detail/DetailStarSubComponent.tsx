import React from 'react';
import {BiBookmarks, BiSolidBookmarks} from "react-icons/bi";

interface DetailStarSubComponentProps{
    initialYn : boolean;
    importantRecord:(important:boolean) => void;
    style : React.CSSProperties;
}

const DetailStarSubComponent:React.FC<DetailStarSubComponentProps> = ({ initialYn, importantRecord ,style }) => {
    return (
        <>
            {initialYn ? (
                <BiSolidBookmarks
                    onClick={() => importantRecord(false)}
                    style={style}
                />
            ) : (
                <BiBookmarks
                    onClick={() => importantRecord(true)}
                    style={style}
                />
            )}
        </>
    );
};


export default DetailStarSubComponent;