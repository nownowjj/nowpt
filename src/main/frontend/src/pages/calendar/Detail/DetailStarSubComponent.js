import React from 'react';
import {TiStarFullOutline, TiStarOutline} from "react-icons/ti";
import {BiBookmarks, BiSolidBookmarks} from "react-icons/bi";
import {BsFillBookmarksFill} from "react-icons/bs";

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