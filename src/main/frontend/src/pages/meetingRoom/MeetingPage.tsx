import React, {useState} from 'react';
import MeetingReservationComponent from "./MeetingReservationComponent";
import MeetingListComponent from "./MeetingListComponent";

const MeetingPage = () => {

    const [data,setData]= useState(0);

    const parentFunction = (data)=>{
        setData(data);
    }


    return (
        <div>
            <MeetingReservationComponent data={data} parentFunction={parentFunction}/>
            <MeetingListComponent data={data}/>
        </div>
    );
};

export default MeetingPage;