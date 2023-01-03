import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

const NoticeUpdateComponent = () => {
    let {noticeSn} = useParams();

    useEffect(()=>{
        alert(noticeSn);
    })

    return (
        <div>
        </div>
    );
};

export default NoticeUpdateComponent;