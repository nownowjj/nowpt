import React from 'react';
import {TiStarFullOutline, TiStarOutline} from "react-icons/ti";

const DetailStarSubComponent = ({ initialYn, importantRecord ,style }) => {
    return (
        <>
            {initialYn ? (
                <TiStarFullOutline
                    onClick={() => importantRecord(false)}
                    style={style}
                />
            ) : (
                <TiStarOutline
                    onClick={() => importantRecord(true)}
                    style={style}
                />
            )}
        </>
    );
};


export default DetailStarSubComponent;