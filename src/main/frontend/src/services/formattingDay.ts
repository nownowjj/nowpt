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
 * @param {DateType}
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
const getMyDay=(date:DateType)=> getFormatDay(date,'MM월DD일');


const getFirstOrLastMonthYear = (date:DateType) => {
    console.log('getFirstOrLastMonthYear');

    const year = getYDay(date);
    const month =getMonthDay(date);

    if(month === '12') return getNextOrPreviousYear(year,true);
    if(month === '01')  return getNextOrPreviousYear(year,false);
}

// return YYYY
const getNextOrPreviousYear =(year:string , next:boolean)=> {
    return (parseInt(year) + (next ? +1 : -1)).toString();
}




export {getYmdDay ,getYmDay , getYDay , getY_m_dDay , getMyDay , getMonthDay , getFirstOrLastMonthYear};

