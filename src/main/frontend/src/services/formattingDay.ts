import dayjs from "dayjs";

type DateType = string | Date;


const getFormatDay = (date:DateType , formatType:string)=> dayjs(date).format(formatType)
/**
 * @param date
 * @return YYYYMMDD
 */
const getYmdDay=(date:DateType)=> getFormatDay(date,'YYYYMMDD');
const getY_m_dDay=(date:DateType)=> getFormatDay(date,'YYYY-MM-DD');

/**
 * Get YYYYMM formatted date
 * @param date
 * @return {YYYYMM}
 */
const getYmDay=(date:DateType)=> getFormatDay(date,'YYYYMM');

/**
 * @param date
 * @return YYYY
 */
const getYDay=(date:DateType)=> getFormatDay(date,'YYYY');

/**
 * @param date
 * @return MM
 */
const getMonthDay=(date:DateType)=> getFormatDay(date,'MM');

/**
 * @param date
 * @return MM월DD일
 */
const getMyDay=(date:DateType)=> getFormatDay(date,'M월 DD일');
const getMyDddDay=(date:DateType)=> getFormatDay(date,'M월 DD일 ddd요일');



const getFirstOrLastMonthYear = (date:DateType) => {
    const year = getYDay(date);
    const month =getMonthDay(date);

    if(month === '12') return getNextOrPreviousYear(year,true);
    if(month === '01')  return getNextOrPreviousYear(year,false);
}

// return YYYY
const getNextOrPreviousYear =(year:string , next:boolean)=> {
    console.log(`$getNextOrPreviousYear 감지`);
    return (parseInt(year) + (next ? +1 : -1)).toString();
}

// yyyymmdd string ->  Date
const getYmdToDate=(ymd:string)=>{
    return new Date(ymd.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
}



export {getFormatDay,getYmdDay ,getYmDay , getYDay , getY_m_dDay , getMyDay , getMonthDay , getFirstOrLastMonthYear,getMyDddDay ,getYmdToDate};

