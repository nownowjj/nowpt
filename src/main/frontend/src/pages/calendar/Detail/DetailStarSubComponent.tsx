import React from 'react';
import {BiBookmarks, BiSolidBookmarks} from "react-icons/bi";

const DetailStarSubComponent = ({ initialYn, importantRecord ,style }) => {
    return (
        <>
            {initialYn ? (
                // <TiStarFullOutline
                <BiSolidBookmarks
                    onClick={() => importantRecord(false)}
                    style={style}
                />
            ) : (
                // <TiStarOutline
                <BiBookmarks
                    onClick={() => importantRecord(true)}
                    style={style}
                />
            )}
        </>
    );
};


export default DetailStarSubComponent;