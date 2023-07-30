import React from 'react';
import {TiStarFullOutline, TiStarOutline} from "react-icons/ti";

const DetailStarSubComponent = ({ initialYn, importantRecord }) => {
    return (
        <>
            {initialYn ? (
                <TiStarFullOutline
                    onClick={() => importantRecord(false)}
                    style={{ color: 'black',fontSize:"19px" }}
                />
            ) : (
                <TiStarOutline
                    onClick={() => importantRecord(true)}
                    style={{ color: 'black',fontSize:"19px" }}
                />
            )}
        </>
    );
};


export default DetailStarSubComponent;