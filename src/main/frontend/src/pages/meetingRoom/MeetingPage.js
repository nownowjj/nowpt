import React from 'react';
import MeetingReservationComponent from "./MeetingReservationComponent";
import MeetingListComponent from "./MeetingListComponent";

const MeetingPage = () => {
    return (
        <div>
            <MeetingReservationComponent/>
            <MeetingListComponent/>
        </div>
    );
};

export default MeetingPage;