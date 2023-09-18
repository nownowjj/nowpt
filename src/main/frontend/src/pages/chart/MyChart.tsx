// import React from 'react';
// import { Line, Chart } from 'react-chartjs-2';
// import { LinearScale } from 'chart.js'; // Import the LinearScale from chart.js
//
// // Register the LinearScale module
// Chart.register(LinearScale);
// const MyChart = () => {
//     const chartData = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [
//             {
//                 label: 'My Dataset',
//                 data: [65, 59, 80, 81, 56, 55, 40],
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1,
//             },
//         ],
//     };
//
//     const chartOptions = {
//         scales: {
//             y: {
//                 type: 'linear', // Use 'linear' scale type
//                 beginAtZero: true,
//             },
//         },
//     };
//     return (
//         <div>
//             <Line data={chartData} options={chartOptions}/>
//         </div>
//     );
// };
//
// export default MyChart;