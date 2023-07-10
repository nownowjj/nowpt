import React from 'react';
import moment from "moment";

const CalendarTitleContent = (data) => {  // data {date...  mark...}
    const date =moment(data.date).format('YYYY-MM-DD');
    const mark = data.mark;
    const yn = mark.find( x => x === date);

    return (
        <>
            <div className="dotWrap">
                {
                    yn ?
                        <>
                            <div className="dot"></div>
                            <div className="dot2"></div>
                        </>
                    :
                    null
                }
           </div>
        </>
    );
};

export default CalendarTitleContent;