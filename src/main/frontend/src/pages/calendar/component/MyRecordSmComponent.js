import React from 'react';

const MyRecordSmComponent = ({recordList}) => {
    console.log('detail sm');

    console.log(recordList);

    const  yearGrouped = {};
    recordList.length >0 &&recordList.forEach((item)=>{
        const { year, month, monthCount } = item;
        if (!yearGrouped[year]) {
            yearGrouped[year] = {
                year: year,
                data: [ ]
            };
        }
        yearGrouped[year].data.push({ month, monthCount });
    })


    // 전체 건수
    // const totalCount = myRecord&&myRecord.reduce((acc, item) => acc + item.monthCount, 0);
    // 년도 추출
    console.log(Object.keys(yearGrouped));


    return (
        <>
            {
                recordList.length > 0
                    ?
                Object.values(yearGrouped).map((item,index) => (
                    <ul key={index}>
                        <li>{item.year}</li>
                        <ul>
                            {item.data.map((monthData) => (
                                <li key={monthData.month}>
                                    Month: {monthData.month}, Count: {monthData.monthCount}
                                </li>
                            ))}
                        </ul>
                    </ul>
                )):
                    '기록이 없어'
            }
        </>
    );
};

export default MyRecordSmComponent;