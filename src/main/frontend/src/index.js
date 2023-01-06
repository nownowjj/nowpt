import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));


ReactDOM.render(
    // <React.StrictMode> 태그로 <app/>이 감싸져있으면
    // 개발모드에서 (개발 단계시 오류를 잘 잡기위해) 두 번씩 렌더링됩니다.
        <App />
,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();