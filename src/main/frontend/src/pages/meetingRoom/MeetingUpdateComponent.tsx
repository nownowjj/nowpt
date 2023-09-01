// import React, {useEffect} from 'react';
// import {useParams} from "react-router-dom";
// import {selectReservationByReservationSn} from "../../api/ReservationApi";
// import styled from "styled-components";
// import DatePicker from "react-datepicker";
// import dayjs from "dayjs";
//
// const MeetingUpdateComponent = () => {
//     const now = dayjs().toDate();
//     // 공지사항Sn 상세 페이지
//     const {reservationSn} = useParams();
//
//     const filterDays = (date) => {
//         // Disable Weekends
//         return !(date.getDay() === 0 || date.getDay() === 6);
//     }
//
//
//     useEffect(()=>{
//         selectReservationByReservationSn(reservationSn)
//             .then(response =>{
//                 console.log(response.data);
//                 console.log("meetingRoom " + response.data.meetingRoom);
//                 console.log("purpose " + response.data.purpose);
//                 console.log("useDay " + response.data.useDay);
//                 console.log("useStartTime " + response.data.useStartTime);
//                 console.log("useEndTime " + response.data.useEndTime);
//             }).catch(error =>{
//                 console.log(error)
//         })
//     },[reservationSn])
//
//     return (
//         <div>
//             <MyDatePicker
//                 locale="ko"
//                 // selected={startDay}
//                 minDate={now}
//                 // onChange={date => setStartDayEvent(date)}
//                 dateFormat="yyyy년 MM월 dd일(eee)"
//                 filterDate={filterDays}
//             />
//
//
//
//         </div>
//     );
// };
//
//
// const MyDatePicker = styled(DatePicker)`
//   border-radius: 4px;
//   border: 2px solid #e8e8e8;
//   padding: 10px 10px 10px 10px;
//   background-color: white;
//   margin: 2px;
//   outline:none;
//   width:250px;
//
//   @media (max-width: 768px) {
//     width:97%;
//     // margin
//   };
// `
// export default MeetingUpdateComponent;