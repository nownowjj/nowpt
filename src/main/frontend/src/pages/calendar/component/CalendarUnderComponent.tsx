import React from 'react';
import {ScheduleDetailType} from "../../../model/CalendarApiModel";

interface UnderProps {
    yearHolidays : ScheduleDetailType[];
}

const CalendarUnderComponent = ({yearHolidays}:UnderProps) => {

    console.log(yearHolidays);
    return (
        <div>
            
        </div>
    );
};

export default CalendarUnderComponent;